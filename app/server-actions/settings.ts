"use server";

import {
  SETTINGS_ID,
  SYSTEM_SETTINGS_COLLECTION,
  SystemSettings,
} from "@components/dashboard/settings/model";
import {
  asSingleDatabaseEntry2,
  DatabaseEntry,
} from "@framework/firebase.utils";
import { getFirestoreInstance } from "@app/api/utils";

export async function getSettings(
  id = SETTINGS_ID
): Promise<DatabaseEntry<SystemSettings>> {
  const db = getFirestoreInstance();

  return new Promise((resolve) => {
    db.collection(SYSTEM_SETTINGS_COLLECTION)
      .doc(id)
      .get()
      .then((doc) => {
        return asSingleDatabaseEntry2<SystemSettings>(doc, { hotTopics: [] });
      })
      .then((data) => {
        resolve(data!);
      });
  });
}
