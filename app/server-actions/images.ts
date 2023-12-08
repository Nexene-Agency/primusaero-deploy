"use server";

import {asDatabaseEntries2, DatabaseEntry} from "@framework/firebase.utils";
import {Picture, PICTURES_COLLECTION,} from "@components/dashboard/pictures/model";
import {getFirestoreInstance} from "@app/api/utils";

export async function getImagesByTag(
  tag: string
): Promise<DatabaseEntry<Picture>[]> {
  console.log("loading images by tag", tag);

  const db = getFirestoreInstance();

  return new Promise((resolve, reject) => {
    db.collection(PICTURES_COLLECTION)
      .where("tags", "array-contains-any", tag)
      .limit(20)
      .get()
      .then((hits) => {
        return asDatabaseEntries2<Picture>(hits);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error("cannot read image list by tag", tag, error);
        resolve([]);
      });
  });
}

export async function getImageByName(
  name: string
): Promise<DatabaseEntry<Picture>[]> {
  console.log("loading images by name", name);

  const db = getFirestoreInstance();

  return new Promise((resolve, reject) => {
    db.collection(PICTURES_COLLECTION)
      .where("name", "==", name)
      .limit(1)
      .get()
      .then((hits) => {
        return asDatabaseEntries2<Picture>(hits);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error("cannot read image list by name", name, error);
        resolve([]);
      });
  });
}
