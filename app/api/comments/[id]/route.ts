// This is an example of how to access a session from an API route
import {NextRequest} from "next/server";
import {
  getFirestoreInstance,
  getSessionAndUser,
  nextAccessDeniedResponse,
  nextInternalError,
  nextOkResponse,
  serviceErrorAsNextResponse,
} from "@app/api/utils";
import {checkRole2, safeParse} from "@framework/api/utils";
import {ServiceError} from "@framework/api/service.error";
import {CommentModerationRequest, COMMENTS_COLLECTION,} from "@components/comments/model";
import {COUNTERS_COLLECTION, idByParent, PENDING_COMMENTS_ID,} from "@app/api/counters/model";
import admin from "firebase-admin";

/** authenticated users can approve/revoke a comment */
const putHandler = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const auth = await getSessionAndUser(req);
  const payload = safeParse(await req.text()) as CommentModerationRequest;

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  const db = getFirestoreInstance();

  return checkRole2(auth.user!.id, ["editor", "admin"])
    .then(() => {
      if (payload.revoke) {
        return db.collection(COMMENTS_COLLECTION).doc(params.id).update({
          approved: false,
          approvedAt: new Date().toISOString(),
          approvedBy: auth.user!.email,
        });
      } else {
        return db.collection(COMMENTS_COLLECTION).doc(params.id).update({
          approved: true,
          approvedAt: new Date().toISOString(),
          approvedBy: auth.user!.email,
        });
      }
    })
    .then(() => {
      // now update the general pending comments counter
      return db
        .collection(COUNTERS_COLLECTION)
        .doc(PENDING_COMMENTS_ID)
        .set(
          {
            pending: admin.firestore.FieldValue.increment(
              payload.revoke ? 1 : -1
            ),
          },
          { merge: true }
        );
    })
    .then(() => {
      // now update the direct comments counter
      return db
        .collection(COUNTERS_COLLECTION)
        .doc(idByParent(payload.parent, payload.parentId))
        .set(
          {
            pending: admin.firestore.FieldValue.increment(
              payload.revoke ? 1 : -1
            ),
            comments: admin.firestore.FieldValue.increment(
              payload.revoke ? -1 : 1
            ),
          },
          { merge: true }
        );
    })
    .then(() => {
      return nextOkResponse();
    })
    .catch((error) => {
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

/** authenticated users can delete a document */
const deleteHandler = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const auth = await getSessionAndUser(req);
  const parent = req.nextUrl.searchParams.get("p");
  const parentId = req.nextUrl.searchParams.get("pId");

  if (!auth.user || !parent || !parentId) {
    return nextAccessDeniedResponse();
  }

  const db = getFirestoreInstance();

  return checkRole2(auth.user!.id, ["admin", "editor"])
    .then(() => {
      return db.collection(COMMENTS_COLLECTION).doc(params.id).delete();
    })
    .then(() => {
      // now update the general pending comments counter
      return db
        .collection(COUNTERS_COLLECTION)
        .doc(PENDING_COMMENTS_ID)
        .set(
          {
            pending: admin.firestore.FieldValue.increment(-1),
          },
          { merge: true }
        );
    })
    .then(() => {
      // now update the direct comments counter
      return db
        .collection(COUNTERS_COLLECTION)
        .doc(idByParent(parent, parentId))
        .set(
          {
            pending: admin.firestore.FieldValue.increment(-1),
          },
          { merge: true }
        );
    })
    .then(() => {
      return nextOkResponse();
    })
    .catch((error) => {
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export { putHandler as PUT, deleteHandler as DELETE };
