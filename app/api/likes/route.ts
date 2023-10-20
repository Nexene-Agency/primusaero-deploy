// This is an example of how to access a session from an API route
import {NextRequest, NextResponse} from "next/server";
import {getFirestoreInstance, getSessionAndUser, nextInternalError, nextOkResponse,} from "@app/api/utils";
import {safeParse} from "secure-json-parse";
import {Like, LikeRequest, LIKES_COLLECTION} from "@components/likes/model";
import {asSingleDatabaseEntry2, DatabaseEntry,} from "@framework/firebase.utils";
import {idByParent} from "@app/api/counters/model";

/** non-authenticated users can read the likes */
const getHandler = async (req: NextRequest, res: NextResponse) => {
  const url = new URL(req.url);
  const parent = url.searchParams.get("p")!;
  const parentId = url.searchParams.get("pId")!;

  console.log("loading likes for", parent, parentId);

  const db = getFirestoreInstance();

  return db
    .collection(LIKES_COLLECTION)
    .doc(idByParent(parent, parentId))
    .get()
    .then((doc) => {
      return asSingleDatabaseEntry2<Like>(doc, { parent, parentId, likes: {} });
    })
    .then((doc) => {
      console.log("");
      return nextOkResponse(doc);
    })
    .catch((error) => {
      console.error(`cannot read likes`, error);
      return nextInternalError(error);
    });
};

const putHandler = async (req: NextRequest, res: NextResponse) => {
  const auth = await getSessionAndUser(req);
  const payload = safeParse(await req.text()) as LikeRequest;

  if (auth.user) {
    payload.userId = auth.user.id!; // if authenticated user, then use its ID
  }

  const db = getFirestoreInstance();

  const like: DatabaseEntry<Like> | undefined = await db
    .collection(LIKES_COLLECTION)
    .doc(idByParent(payload.parent, payload.parentId))
    .get()
    .then((doc) => {
      return asSingleDatabaseEntry2<Like>(doc, {
        parent: payload.parent,
        parentId: payload.parentId,
        likes: {},
      });
    });

  const likes = like!.data.likes;
  if (Reflect.get(likes, payload.userId)) {
    console.log("have like, remove");
    Reflect.deleteProperty(likes, payload.userId);
  } else {
    console.log("no like, add");
    Reflect.set(likes, payload.userId, 1);
  }
  like!.data.likes = likes;

  return db
    .collection(LIKES_COLLECTION)
    .doc(idByParent(payload.parent, payload.parentId))
    .update({ likes })
    .then(() => {
      return nextOkResponse(like!);
    })
    .catch((error) => {
      console.error(`cannot save like`, error);
      return nextInternalError(error);
    });
};

export { getHandler as GET, putHandler as PUT };
