// This is an example of how to access a session from an API route
import {NextRequest, NextResponse} from "next/server";
import {getFirestoreInstance, getSessionAndUser, nextAccessDeniedResponse, nextOkResponse} from "@app/api/utils";
import {Selectable} from "@framework/model";
import {COMPANIES_COLLECTION, Company} from "@components/dashboard/companies/model";

const GetCompaniesForPopup = async (
  req: NextRequest,
  res: NextResponse
): Promise<any> => {
  const auth = await getSessionAndUser(req);

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  const db = getFirestoreInstance();

  return db
    .collection(COMPANIES_COLLECTION)
    .orderBy("name", "asc")
    .limit(100)
    .get()
    .then((hits) => {
      console.log("found companies", hits.size);
      const data: Selectable[] = [];
      hits.forEach((doc) => {
        const content = doc.data() as Company;
        data.push({id: content.code, name: content.name} as Selectable);
      });
      return data;
    })
    .then((data) => {
      return nextOkResponse(data as Selectable[]);
    })
    .catch((error) => {
      console.error(`cannot return companies for popup`, error);
      return nextOkResponse([] as Selectable[]);
    });
};

export {GetCompaniesForPopup as GET};
