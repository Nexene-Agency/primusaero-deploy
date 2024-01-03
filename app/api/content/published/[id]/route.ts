import {NextRequest} from "next/server";
import {
  getFirestoreInstance,
  getSessionAndUser,
  nextAccessDeniedResponse,
  nextInternalError,
  nextOkResponse,
  serviceErrorAsNextResponse,
} from "@app/api/utils";
import {ServiceError} from "@framework/api/service.error";
import {checkRole2} from "@framework/api/utils";
import {CONTENT_FILES_COLLECTION, ContentFile, PUBLISHED_FILES_COLLECTION} from "@components/dashboard/contents/model";
import {DatabaseEntry} from "@framework/firebase.utils";

/**
 * Revokes the publication of the content. Must delete the publishedFiles entry and update the file entry.
 * Only logged-in editors can revoke a published content.
 *
 * @param req The request
 * @param res The response
 */
const deleteHandler = async (req: NextRequest,
                             {params}: { params: { id: string } }) => {
  const auth = await getSessionAndUser(req);

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  const db = getFirestoreInstance();

  const contentFile: DatabaseEntry<ContentFile> = {
    data: {} as any,
  } as DatabaseEntry<ContentFile>;

  return checkRole2(auth.user!.id, ["editor"])
    .then((found) => {
      return db.collection(CONTENT_FILES_COLLECTION).doc(params.id).get(); // search for the file
    })
    .then((doc) => {
      if (!doc.exists) {
        throw new ServiceError(404, "file not found");
      }
      contentFile.id = doc.id;
      contentFile.data = doc.data() as ContentFile; // load the file if exists

      return db
        .collection(PUBLISHED_FILES_COLLECTION)
        .doc(contentFile.id)
        .delete(); // delete the published version
    })
    .then(() => {
      return db
        .collection(CONTENT_FILES_COLLECTION)
        .doc(contentFile.id!)
        .update({
          publishedBy: "",
          publishedAt: "",
          publishedVersion: 0,
        } as any); // update the original file
    })
    .then(() => {
      return nextOkResponse();
    })
    .catch((error) => {
      console.error(`cannot revoke publication of the file`, error);
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export {deleteHandler as DELETE};
