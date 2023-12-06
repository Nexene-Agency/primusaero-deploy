"use server";
import {asDatabaseEntries2, DatabaseEntry,} from "@framework/firebase.utils";
import {getFirestoreInstance} from "@app/api/utils";
import {COMPANIES_COLLECTION, Company} from "@components/dashboard/companies/model";
import {Location, LOCATIONS_COLLECTION} from "@components/dashboard/locations/model";
import {Personnel, PERSONNEL_COLLECTION} from "@components/dashboard/personnel/model";

export interface CompanyResponse {
  company?: DatabaseEntry<Company>;
  locations?: DatabaseEntry<Location>[];
  personnel?: DatabaseEntry<Personnel>[];
}

export async function getCompanyData(code: string): Promise<CompanyResponse> {
  console.log("loading company");

  const db = getFirestoreInstance();

  return new Promise<CompanyResponse>((resolve) => {
    const result = {} as CompanyResponse;
    db.collection(COMPANIES_COLLECTION)
      .where("code", "==", code)
      .limit(1) // this is loading just the first one for the initial rendering
      .get()
      .then((hits) => {
        return asDatabaseEntries2<Company>(hits);
      })
      .then((companies) => {
        if (companies.length < 1) {
          throw new Error("no company found");
        }
        result.company = companies[0];
        return db.collection(LOCATIONS_COLLECTION)
          .where("valid", "==", true)
          .where("companies", "array-contains", result.company?.data?.code)
          .limit(32)
          .orderBy("listingOrder")
          .get();
      })
      .then((hits) => {
        return asDatabaseEntries2<Location>(hits);
      })
      .then((locations) => {
        result.locations = locations;
        return db.collection(PERSONNEL_COLLECTION)
          .where("valid", "==", true)
          .where("companies", "array-contains", result.company?.data?.code)
          .limit(32)
          .orderBy("listingOrder")
          .get();
      })
      .then((hits) => {
        return asDatabaseEntries2<Personnel>(hits);
      })
      .then((personnel) => {
        result.personnel = personnel;
        resolve(result);
      })
      .catch((error) => {
        console.error("cannot read company data", error);
        resolve(result);
      });
  });
}
