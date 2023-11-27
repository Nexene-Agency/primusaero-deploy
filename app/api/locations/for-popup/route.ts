// This is an example of how to access a session from an API route
import {NextRequest, NextResponse} from "next/server";
import {getFirestoreInstance, getSessionAndUser, nextAccessDeniedResponse, nextOkResponse} from "@app/api/utils";
import {Location, LOCATIONS_COLLECTION} from "@components/dashboard/locations/model";
import {Selectable} from "@framework/model";

const getLocationsForPopup = async (
  req: NextRequest,
  res: NextResponse
): Promise<any> => {
  const auth = await getSessionAndUser(req);

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  const db = getFirestoreInstance();

  return db
    .collection(LOCATIONS_COLLECTION)
    .orderBy("name", "asc")
    .limit(100)
    .get()
    .then((hits) => {
      console.log("found locations", hits.size);
      const data: Selectable[] = [];
      hits.forEach((doc) => {
        const content = doc.data() as Location;
        data.push({id: content.code, name: content.name} as Selectable);
      });
      return data;
    })
    .then((data) => {
      return nextOkResponse(data as Selectable[]);
    })
    .catch((error) => {
      console.error(`cannot return locations for popup`, error);
      return nextOkResponse([] as Selectable[]);
    });
};

export {getLocationsForPopup as GET};
