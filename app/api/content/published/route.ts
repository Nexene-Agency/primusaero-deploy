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
import {checkRole2} from "@framework/api/utils";
import {
  CONTENT_FILES_COLLECTION,
  ContentFile,
  FilePublicationRequest,
  PUBLISHED_FILES_COLLECTION
} from "@components/dashboard/contents/model";
import {DatabaseEntry} from "@framework/firebase.utils";

/**
 * Publish the content. Must create a publishedFiles entry and update the file entry. Only logged-in editors can
 * publish content.
 *
 * @param req The request
 * @param res The response
 */
const putHandler = async (req: NextRequest, res: NextResponse) => {
  const auth = await getSessionAndUser(req);
  const payload = safeParse(await req.text()) as FilePublicationRequest;

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  const db = getFirestoreInstance();

  const publishedAt = new Date().toISOString();

  const contentFile: DatabaseEntry<ContentFile> = {
    data: {} as any,
  } as DatabaseEntry<ContentFile>;

  return checkRole2(auth.user!.id, ["editor"])
    .then((found) => {
      return db.collection(CONTENT_FILES_COLLECTION).doc(payload.fileId).get(); // search for the file
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
        .set(Object.assign({}, contentFile.data, {
          publishedBy: auth.user!.name ?? auth.user!.email,
          publishedAt,
          publishedVersion: contentFile.data.version,
        }) as any); // save the published version
    })
    .then(() => {
      return db
        .collection(CONTENT_FILES_COLLECTION)
        .doc(contentFile.id!)
        .update({
          publishedBy: auth.user!.name ?? auth.user!.email,
          publishedAt,
          publishedVersion: contentFile.data.version,
        } as any); // update the original file
    })
    .then(() => {
      return nextOkResponse();
    })
    .catch((error) => {
      console.error(`cannot publish file`, error);
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export {putHandler as PUT};
