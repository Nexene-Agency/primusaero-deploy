"use server";

import {Location,} from "@components/dashboard/locations/model";
import {Picture,} from "@components/dashboard/pictures/model";
import {DatabaseEntry} from "@framework/firebase.utils";

export interface LocationData {
  id: string;
  location: DatabaseEntry<Location>[];
  pictures: DatabaseEntry<Picture>[];
}

// export async function getLocation(id: string): Promise<LocationData> {
//   console.log("loading location", id);
//   const result: LocationData = {
//     id,
//     location: [],
//     pictures: [],
//   };
//
//   const db = getFirestoreInstance();
//
//   return new Promise((resolve, reject) => {
//     db.collection(LOCATIONS_COLLECTION)
//       .doc(id)
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//           result.location.push({
//             id,
//             data: doc.data(),
//           } as DatabaseEntry<Location>);
//           console.log("location loaded", result.location[0]);
//
//           return db
//             .collection(PICTURES_COLLECTION)
//             .where("tags", "array-contains-any", [
//               result.location[0].data.imageTag ?? "",
//             ])
//             .limit(20)
//             .get();
//         } else {
//           return undefined;
//         }
//       })
//       .then((pictures) => {
//         if (pictures) {
//           pictures.forEach((doc) => {
//             result.pictures.push({
//               id: doc.id,
//               data: doc.data(),
//             } as DatabaseEntry<Picture>);
//           });
//         }
//       })
//       .catch((error) => {
//         console.log("error loading location", error);
//       })
//       .finally(() => {
//         // does not matter what happens, the result is returned
//         resolve(result);
//       });
//   });
// }

// export async function getLocations(): Promise<DatabaseEntry<Location>[]> {
//   console.log("loading locations");
//
//   const db = getFirestoreInstance();
//
//   return new Promise((resolve, reject) => {
//     db.collection(LOCATIONS_COLLECTION)
//       .where("valid", "==", true)
//       .where("expires", ">", new Date().toISOString().substring(0, 10))
//       .get()
//       .then((hits) => {
//         return asDatabaseEntries2<Location>(hits);
//       })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((error) => {
//         console.log("error loading locations", error);
//         resolve([]);
//       });
//   });
// }
