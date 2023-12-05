import Joi from "joi";
import axios from "axios";
import {DatabaseEntry, saveOrCreate} from "@framework/firebase.utils";

export interface Picture {
  name: string;
  width: number;
  height: number;
  description: string;
  previewURL: string;
  imageURL: string;
  fileName: string;
  token: string;
  valid: boolean;
  tags: string[];
}

export interface PictureReference {
  id: string;
  data: {
    name: string;
    description: string;
    valid: boolean;
  };
}

export const newPicture = (): Picture => {
  return {
    name: "new picture",
    width: 0,
    height: 0,
    description: "",
    previewURL: "",
    token: "",
    imageURL: "",
    fileName: "",
    valid: true,
    tags: [],
  } as Picture;
};

export const PICTURE_SCHEMA = Joi.object({
  name: Joi.string().required().min(1).max(128),
  width: Joi.number().required().min(0).max(9999),
  height: Joi.number().required().min(0).max(9999),
  description: Joi.string().optional().allow("").max(1024),
  previewURL: Joi.string().optional().allow("").max(1024),
  token: Joi.string().optional().allow("").max(64),
  imageURL: Joi.string().optional().allow("").max(1024),
  fileName: Joi.string().optional().allow("").max(128),
  valid: Joi.boolean().required(),
  tags: Joi.array().items(Joi.string().max(32)).optional(),
});

export const PICTURES_COLLECTION = "pictures";

export const savePicture = (
  entry: Picture,
  formData: FormData,
  id?: string
): Promise<DatabaseEntry<Picture>> => {
  console.log("must save", entry);
  return new Promise((resolve, reject) => {
    if (id) {
      console.log("modified!");
      saveOrCreate<Picture>(PICTURES_COLLECTION, {id, data: entry})
        .then((saved) => resolve(saved))
        .catch((error: unknown) => {
          reject(error);
        });
    } else {
      console.log("new!", formData);
      axios
        .post("/api/images", formData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

//
// export const deletePictureFromFirebase = (
//   id: string,
//   entry: Picture
// ): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     axios
//       .delete(`/api/images?id=${id}&fName=${entry.fileName}`)
//       .then(() => {
//         resolve();
//       })
//       .catch((error) => {
//         console.error("cannot delete picture", error);
//         reject(error);
//       });
//   });
// };

// export const searchPictureEntries = (
//   firestore: Firestore,
//   content: ListContent<DatabaseEntry<Picture>>,
//   filter: ListFilterValue,
//   continueAt?: DatabaseEntry<Picture>
// ): Promise<ListContent<DatabaseEntry<Picture>>> => {
//   const q = query(
//     collection(firestore, PICTURES_COLLECTION),
//     orderBy(filter.fieldName),
//     where(filter.fieldName, ">=", filter.value),
//     where(filter.fieldName, "<=", filter.value + "\uf8ff"),
//     limit(content.pageSize),
//     startAfter(continueAt ? continueAt : null)
//   );
//   return loadByQuery(q, content);
// };
