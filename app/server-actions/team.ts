"use server";

import { Location } from "@components/dashboard/locations/model";
import { Picture } from "@components/dashboard/pictures/model";
import { asDatabaseEntries2, DatabaseEntry } from "@framework/firebase.utils";
import {
  TEAM_MEMBERS_COLLECTION,
  TeamMember,
} from "@components/dashboard/team/model";
import { ListContent } from "@/framework/list/list.definition";
import { getFirestoreInstance } from "@app/api/utils";

export interface LocationData {
  id: string;
  location: DatabaseEntry<Location>[];
  pictures: DatabaseEntry<Picture>[];
}

export async function getTeamMembers(): Promise<ListContent<TeamMember>> {
  const db = getFirestoreInstance();

  return new Promise((resolve, reject) => {
    db.collection(TEAM_MEMBERS_COLLECTION)
      .where("valid", "==", true)
      .where("visible", "==", true)
      .orderBy("order", "asc")
      .limit(100)
      .get()
      .then((hits) => {
        return asDatabaseEntries2<TeamMember>(hits);
      })
      .then((data) => {
        resolve({ data, pageSize: 100 } as ListContent<TeamMember>);
      })
      .catch((error) => {
        console.log("error loading teams", error);
        resolve({ data: [], pageSize: 100, error } as ListContent<TeamMember>);
      });
  });
}
