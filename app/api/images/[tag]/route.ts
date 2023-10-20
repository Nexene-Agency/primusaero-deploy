import {NextRequest} from "next/server";
import {getFirestoreInstance, nextInternalError, nextOkResponse, serviceErrorAsNextResponse,} from "@app/api/utils";
import {Picture, PICTURES_COLLECTION,} from "@components/dashboard/pictures/model";
import {asDatabaseEntries2} from "@framework/firebase.utils";
import {ServiceError} from "@framework/api/service.error";

/** non-authenticated users can read the images by tag, for the map search */
const getHandler = async (
  req: NextRequest,
  { params }: { params: { tag: string } }
) => {
  const db = getFirestoreInstance();

  return db
    .collection(PICTURES_COLLECTION)
    .where("valid", "==", true)
    .where("tags", "array-contains", params.tag)
    .orderBy("name", "asc")
    .limit(32)
    .get()
    .then((hits) => {
      return asDatabaseEntries2<Picture>(hits);
    })
    .then((data) => {
      return nextOkResponse({ data, pageSize: 32 });
    })
    .catch((error) => {
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export { getHandler as GET };
