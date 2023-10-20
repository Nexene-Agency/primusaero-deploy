// This is an example of how to access a session from an API route
import {NextRequest, NextResponse} from "next/server";
import {
  getFirestoreInstance,
  getSessionAndUser,
  nextAccessDeniedResponse,
  nextInternalError,
  nextOkResponse,
  serviceErrorAsNextResponse,
} from "@app/api/utils";
import {safeParse} from "secure-json-parse";
import {ServiceError} from "@framework/api/service.error";
import {
  BLOGPOST_REFERENCES_COLLECTION,
  BLOGPOSTS_COLLECTION,
  BlogPublicationRequest,
} from "@components/dashboard/blogs/model";
import {checkRole2} from "@framework/api/utils";

/**
 * Publish the blogpost.
 *
 * @param req The request
 * @param res The response
 */
const putHandler = async (req: NextRequest, res: NextResponse) => {
  const auth = await getSessionAndUser(req);
  const payload = safeParse(await req.text()) as BlogPublicationRequest;

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  const db = getFirestoreInstance();

  const publishedAt = new Date().toISOString();

  return checkRole2(auth.user!.id, ["editor"])
    .then((found) => {
      return db.collection(BLOGPOSTS_COLLECTION).doc(payload.id).update({
        published: true,
        publishedAt,
        publishedBy: auth.user!.email,
      });
    })
    .then(() => {
      return db
        .collection(BLOGPOST_REFERENCES_COLLECTION)
        .doc(payload.id)
        .update({
          published: true,
          publishedAt,
        });
    })
    .then(() => {
      return nextOkResponse();
    })
    .catch((error) => {
      console.error(`cannot publish blogpost`, error);
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export { putHandler as PUT };
