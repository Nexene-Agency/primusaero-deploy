import {DocumentData} from "firebase/firestore";
import axios from "axios";

// export const firestoreOf = (
//   firebaseApp: firebaseAppGenerator.FirebaseApp
// ): Firestore => {
//   return getFirestore(firebaseApp);
// };

export interface DatabaseEntry<T> {
  id?: string;
  data: T;
}

// export const saveDocument = <T>(
//   firestore: Firestore,
//   collName: string,
//   entry: T,
//   id?: string,
//   merge?: boolean
// ): Promise<DatabaseEntry<T>> => {
//   return new Promise((resolve, reject) => {
//     if (id) {
//       setDoc(doc(firestore, collName, id!), entry as any, {
//         merge: merge === true,
//       })
//         .then(() => resolve({ id, data: entry as T } as DatabaseEntry<T>))
//         .catch((error) => reject(error));
//     } else {
//       addDoc(collection(firestore, collName), entry as any)
//         .then((created) => resolve({ id: created.id, data: entry as T }))
//         .catch((error) => reject(error));
//     }
//   });
// };

// export const loadByQuery = <T>(
//   query: Query<DocumentData>,
//   content: ListContent<T>
// ): Promise<ListContent<T>> => {
//   return new Promise((resolve, reject) => {
//     getDocs(query)
//       .then((hits) => {
//         const data: any[] = [...content.data];
//         hits.forEach((doc) => {
//           data.push({ id: doc.id, data: doc.data() as T } as DatabaseEntry<T>);
//         });
//         // console.log("loadByQuery resolving with data: ", data);
//         resolve({ data, pageSize: content.pageSize });
//       })
//       .catch((error) => {
//         console.error("loadByQuery error: ", error);
//         reject(error);
//       });
//   });
// };

// export const deleteDocument = (
//   firestore: Firestore,
//   collName: string,
//   id: string
// ): Promise<void> => {
//   return deleteDoc(doc(firestore, collName, id));
// };
//
// export const deleteInBatch = (
//   firestore: Firestore,
//   collName: string,
//   ids: string[]
// ): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     const batchOperation = writeBatch(firestore);
//     ids.forEach((id) => batchOperation.delete(doc(firestore, collName, id)));
//     batchOperation
//       .commit()
//       .then(() => resolve())
//       .catch((error) => reject(error));
//   });
// };

// export const getDocument = <T>(
//   firestore: Firestore,
//   collName: string,
//   id: string,
//   defaultData: any = {}
// ): Promise<DatabaseEntry<T>> => {
//   return new Promise((resolve, reject) => {
//     getDoc(doc(firestore, collName, id))
//       .then((doc) => {
//         if (doc.exists()) {
//           resolve({ id, data: doc.data() as T });
//         } else {
//           resolve({ data: JSON.parse(JSON.stringify(defaultData)) as T });
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

// export const getDocumentRequired = <T>(
//   firestore: Firestore,
//   collName: string,
//   id: string
// ): Promise<DatabaseEntry<T>> => {
//   return new Promise((resolve, reject) => {
//     getDoc(doc(firestore, collName, id))
//       .then((doc) => {
//         if (doc.exists()) {
//           resolve({ id, data: doc.data() as T } as DatabaseEntry<T>);
//         } else {
//           reject({ code: 404 });
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
//
// export const lastEntryOf = <T>(
//   content: ListContent<T>
// ): DatabaseEntry<T> | undefined => {
//   return content.data.length > 0
//     ? (content.data[content.data.length - 1] as DatabaseEntry<T>)
//     : undefined;
// };

// export const saveDocuments = <T>(firestore: Firestore, collName: string, entries: T[]): Promise<DatabaseEntry<T>[]> => {
//   return new Promise((resolve, reject) => {
//     const promises: Promise<DatabaseEntry<T>>[] = [];
//     entries.forEach((entry) => promises.push(saveDocument(firestore, collName, entry)));
//     Promise.all(promises)
//       .then((results) => resolve(results))
//       .catch((error) => reject(error));
//   });
// };

export const asSingleDatabaseEntry2 = <T>(
  doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
  defaultEntry?: T
): Promise<DatabaseEntry<T> | undefined> => {
  return new Promise((resolve) => {
    if (doc.exists) {
      resolve({ id: doc.id, data: doc.data() as T } as DatabaseEntry<T>);
    } else {
      if (defaultEntry) {
        resolve({ data: defaultEntry as T });
      } else {
        resolve(undefined);
      }
    }
  });
};

// export const asSingleDatabaseEntry = <T>(
//   doc: DocumentSnapshot,
//   defaultEntry?: T
// ): Promise<DatabaseEntry<T> | undefined> => {
//   return new Promise((resolve, reject) => {
//     if (doc.exists()) {
//       resolve({ id: doc.id, data: doc.data() as T } as DatabaseEntry<T>);
//     } else {
//       if (defaultEntry) {
//         resolve({ data: defaultEntry as T });
//       } else {
//         resolve(undefined);
//       }
//     }
//   });
// };

export type ConverterFunction<T> = (data: DocumentData) => T;

export const DEFAULT_CONVERTER = (data: DocumentData): any => {
  return Object.assign({}, data);
};

// export const asDatabaseEntries = <T>(
//   hits: QuerySnapshot,
//   converter: ConverterFunction<T> = DEFAULT_CONVERTER
// ): Promise<DatabaseEntry<T>[]> => {
//   return new Promise((resolve) => {
//     const data: DatabaseEntry<T>[] = [];
//     hits.forEach((doc) => {
//       data.push({ id: doc.id, data: converter(doc.data()) });
//     });
//     resolve(data);
//   });
// };

export const asDatabaseEntries2 = <T>(
  hits: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
  converter: ConverterFunction<T> = DEFAULT_CONVERTER
): Promise<DatabaseEntry<T>[]> => {
  return new Promise((resolve) => {
    const data: DatabaseEntry<T>[] = [];
    hits.forEach((doc) => {
      data.push({ id: doc.id, data: converter(doc.data()) });
    });
    resolve(data);
  });
};

export const dbUrl = (collName: string, id?: string): string => {
  return id ? `/api/db/${collName}/${id}` : `/api/db/${collName}`;
};

export const saveOrCreate = <T>(
  collName: string,
  data: DatabaseEntry<T>
): Promise<DatabaseEntry<T>> => {
  return new Promise((resolve, reject) => {
    const promise = data.id
      ? axios.put(dbUrl(collName, data.id), data)
      : axios.post(dbUrl(collName, "0"), data.data);
    promise
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
