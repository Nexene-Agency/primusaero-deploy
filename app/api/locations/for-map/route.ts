// This is an example of how to access a session from an API route
import {NextRequest, NextResponse} from "next/server";
import {getFirestoreInstance, nextOkResponse} from "@app/api/utils";
import {LOCATIONS_COLLECTION} from "@components/dashboard/locations/model";
import {Selectable} from "@framework/model";
import {asDatabaseEntries2} from "@framework/firebase.utils";
import {ListContent} from "@framework/list/list.definition";

/**
 * Returns the locations as a list for the world map, does not require authentication.
 * @param req The incoming request
 * @param res The outgoing response
 */
const getLocationsForMap = async (
  req: NextRequest,
  res: NextResponse
): Promise<any> => {
  const db = getFirestoreInstance();

  return db
    .collection(LOCATIONS_COLLECTION)
    .orderBy("name", "asc")
    .limit(100)
    .get()
    .then((hits) => {
      console.log("found locations for map", hits.size);
      return asDatabaseEntries2(hits);
    })
    .then((data) => {
      return nextOkResponse({
        data,
        pageSize: 100,
      } as ListContent<any>);
    })
    .catch((error) => {
      console.error(`cannot return locations for map`, error);
      return nextOkResponse([] as Selectable[]);
    });
};

export {getLocationsForMap as GET};
