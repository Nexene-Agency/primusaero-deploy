// This is an example of how to access a session from an API route
import {NextRequest, NextResponse} from "next/server";
import {HttpStatusCode} from "axios";
import {asDatabaseEntries2, asSingleDatabaseEntry2, DatabaseEntry,} from "@framework/firebase.utils";
import {increment} from "firebase/firestore";
import {
  getFirestoreInstance,
  getSessionAndUser,
  nextInternalError,
  nextOkResponse,
  serviceErrorAsNextResponse,
} from "@app/api/utils";
import {safeParse} from "secure-json-parse";
import {Comment, COMMENT_SCHEMA, CommentLike, COMMENTS_COLLECTION,} from "@components/comments/model";
import {ListContent} from "@framework/list/list.definition";
import {COUNTERS_COLLECTION, idByParent, PENDING_COMMENTS_ID, PendingCommentsCounter,} from "@app/api/counters/model";
import {ServiceError} from "@framework/api/service.error";

/** non-authenticated users can read the comments */
const getHandler = async (req: NextRequest, res: NextResponse) => {
  const url = new URL(req.url);
  const parent = url.searchParams.get("p")!;
  const parentId = url.searchParams.get("pId")!;
  const next = url.searchParams.get("n");
  const size = parseInt(url.searchParams.get("s") ?? "100");

  const db = getFirestoreInstance();

  console.log("size", size);
  return db
    .collection(COMMENTS_COLLECTION)
    .where("parent", "==", parent)
    .where("parentId", "==", parentId)
    .where("approved", "==", true)
    .orderBy("when", "desc")
    .limit(size)
    .get()
    .then((hits) => {
      console.log("found comments", hits.size);
      return asDatabaseEntries2<Comment>(hits);
    })
    .then((data) => {
      return nextOkResponse({
        data,
        pageSize: size,
      } as ListContent<any>);
    })
    .catch((error) => {
      console.error(`cannot read comments`, error);
      return nextOkResponse({
        data: [],
        pageSize: size,
      } as ListContent<any>);
    });
};

const postHandler = async (req: NextRequest, res: NextResponse) => {
  const auth = await getSessionAndUser(req);
  const payload = safeParse(await req.text()) as Comment;

  const db = getFirestoreInstance();

  if (auth.user) {
    payload.user = auth.user.id!;
    payload.userName = auth.user.name ?? auth.user.email;
    payload.userImage = auth.user.image ?? "";
    payload.approved = false;
  }

  const regex = /(<([^>]+)>)/gi;
  const neutralized = payload.text.replace(regex, "");
  payload.text = neutralized;

  // check whether the payload is valid
  const result = COMMENT_SCHEMA.validate(payload);
  if (result.error) {
    return NextResponse.json(
      { error: result.error },
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }

  const maxPendingComments = parseInt(
    process.env.NEXT_MAX_PENDING_COMMENTS ?? "50"
  );

  const pendingCommentsCounter:
    | DatabaseEntry<PendingCommentsCounter>
    | undefined = await db
    .collection(COUNTERS_COLLECTION)
    .doc(PENDING_COMMENTS_ID)
    .get()
    .then((found) =>
      asSingleDatabaseEntry2<PendingCommentsCounter>(found, { pending: 0 })
    );

  console.log(
    "pending comments: ",
    pendingCommentsCounter!.data.pending,
    "max pending comments: ",
    maxPendingComments
  );

  if (pendingCommentsCounter!.data.pending >= maxPendingComments) {
    return NextResponse.json(
      { error: "too many pending comments" },
      {
        status: HttpStatusCode.BadRequest,
      }
    );
  }

  const savedComment: DatabaseEntry<Comment> = { id: "", data: {} as any };

  return Promise.resolve(db.collection(COMMENTS_COLLECTION).doc())
    .then((ref) => {
      savedComment.id = ref.id;
      return ref.set(payload);
    })
    .then(() => {
      savedComment.data = payload as Comment;
      return db
        .collection(COUNTERS_COLLECTION)
        .doc(PENDING_COMMENTS_ID)
        .update({ pending: increment(1) });
    })
    .then(() => {
      return db
        .collection(COUNTERS_COLLECTION)
        .doc(idByParent(payload.parent, payload.parentId))
        .get();
    })
    .then((found) => {
      if (found.exists) {
        return db
          .collection(COUNTERS_COLLECTION)
          .doc(idByParent(payload.parent, payload.parentId))
          .update({ pending: increment(1) });
      } else {
        return db
          .collection(COUNTERS_COLLECTION)
          .doc(idByParent(payload.parent, payload.parentId))
          .set({
            comments: 0,
            pending: 1,
            parent: payload.parent,
            parentId: payload.parentId,
          });
      }
    })
    .then(() => {
      return NextResponse.json(savedComment, {
        status: HttpStatusCode.Created,
      });
    })
    .catch((error) => {
      console.error(`cannot save comment`, error);
      return NextResponse.json(
        { error: error },
        {
          status: HttpStatusCode.InternalServerError,
        }
      );
    });
};

/**
 * Modify the likes of a comment.
 *
 * @param req The request
 * @param res The response
 */
const putHandler = async (req: NextRequest, res: NextResponse) => {
  const auth = await getSessionAndUser(req);
  const payload = safeParse(await req.text()) as CommentLike;

  if (auth.user) {
    payload.userId = auth.user.id!; // if authenticated user, then use its ID
  }

  const db = getFirestoreInstance();

  const foundComment: DatabaseEntry<Comment> = { id: "", data: {} as any };

  return db
    .collection(COMMENTS_COLLECTION)
    .doc(payload.commentId)
    .get()
    .then((found) => {
      foundComment.id = found.id;
      foundComment.data = found.data() as Comment;
      console.log("got comment to like", foundComment);
      if (Reflect.get(foundComment.data.likes, payload.userId)) {
        console.log("modifying vote");
        const previousVote = Reflect.get(
          foundComment.data.likes,
          payload.userId
        ) as number;
        const newVote = previousVote + payload.vote;
        console.log("previous vote", previousVote);
        console.log("new vote", newVote);
        Reflect.set(foundComment.data.likes, payload.userId, newVote);
        if (newVote === 0) {
          // if vote is zero, then remove
          Reflect.deleteProperty(foundComment.data.likes, payload.userId);
        }
        if (newVote > 1) {
          // if vote is greater than one, then set to one
          Reflect.set(foundComment.data.likes, payload.userId, 1);
        }
        if (newVote < -1) {
          // if vote is less than one, then set to one
          Reflect.set(foundComment.data.likes, payload.userId, -1);
        }
        console.log(
          "final vote",
          Reflect.get(foundComment.data.likes, payload.userId)
        );
      } else {
        console.log("setting vote");
        // if first vote, then simply add
        Reflect.set(foundComment.data.likes, payload.userId, payload.vote);
      }
      return db
        .collection(COMMENTS_COLLECTION)
        .doc(payload.commentId)
        .set({ likes: foundComment.data.likes });
    })
    .then(() => {
      console.log("returning comment with modified likes", foundComment);
      return nextOkResponse(foundComment);
    })
    .catch((error) => {
      console.error(`cannot modify comment`, error);
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export { postHandler as POST, putHandler as PUT, getHandler as GET };
