// This is an example of how to access a session from an API route
import {NextRequest, NextResponse} from "next/server";
import {getFirestoreInstance, nextOkResponse} from "@app/api/utils";
import {CommentsCounter, COUNTERS_COLLECTION, idByParent,} from "@app/api/counters/model";

/** non-authenticated users can read the comments */
const getHandler = async (req: NextRequest, res: NextResponse) => {
  const url = new URL(req.url);
  const parent = url.searchParams.get("p")!;
  const parentId = url.searchParams.get("pId")!;

  const db = getFirestoreInstance();

  return db
    .collection(COUNTERS_COLLECTION)
    .doc(idByParent(parent, parentId))
    .get()
    .then((doc) => {
      if (doc.exists) {
        return nextOkResponse({ id: doc.id, data: doc.data() });
      } else {
        return nextOkResponse({
          data: {
            parent,
            parentId,
            comments: 0,
            pending: 0,
          } as CommentsCounter,
        });
      }
    })
    .catch((error) => {
      console.error(`cannot read comments count`, error);
      return nextOkResponse({
        data: {
          parent,
          parentId,
          comments: 0,
          pending: 0,
        } as CommentsCounter,
      });
    });
};

export { getHandler as GET };
