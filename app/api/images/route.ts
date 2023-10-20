// This is an example of how to access a session from an API route
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import {
  Picture,
  PICTURES_COLLECTION,
} from "@components/dashboard/pictures/model";
import { DatabaseEntry } from "@framework/firebase.utils";
import { randomUUID } from "crypto";
import { ServiceError } from "@framework/api/service.error";
import {
  getFirestoreInstance,
  getSessionAndUser,
  getStorageInstance,
  nextCreatedResponse,
  nextInternalError,
} from "@app/api/utils";
import { checkRole2 } from "@framework/api/utils";

const db = getFirestoreInstance();
const storage = getStorageInstance();
const BUCKET = process.env.FIREBASE_STORAGE_BUCKET;

const deleteFromStorage = (fileName?: string): void => {
  if (fileName) {
    storage
      .bucket(BUCKET)
      .file(fileName)
      .delete()
      .then(() => console.log(`deleted from storage: ${fileName}`))
      .catch((error: unknown) =>
        console.log(`ignoring storage deletion failure: ${fileName}`, error)
      );
  }
};

const deleteFromDatabase = (id?: string): void => {
  if (id) {
    db.collection(PICTURES_COLLECTION)
      .doc(id)
      .delete()
      .then(() => console.log(`deleted from storage: ${id}`))
      .catch((error: unknown) =>
        console.log(`ignoring storage deletion failure: ${id}`, error)
      );
  }
};

const uploadToStorage = (
  name: string,
  kind: string,
  ref: string,
  file: ArrayBuffer
): Promise<string> => {
  return new Promise((resolve, reject) => {
    storage
      .bucket(BUCKET)
      .file(ref)
      .save(Buffer.from(file), {
        onUploadProgress: (snapshot) => {
          console.log("upload snapshot", snapshot);
        },
      })
      .then(() => {
        return storage.bucket(BUCKET).file(ref).getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        });
      })
      .then((url) => {
        console.log(`... ${name} (${kind}) available at ${url[0]}`);
        resolve(url[0]);
      })
      .catch((error: unknown) => {
        reject(error);
      });

    // createResumableUpload();
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress =
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     switch (snapshot.state) {
    //       case "paused":
    //         console.log(`... ${name} (${kind}) paused`);
    //         break;
    //       case "running":
    //         console.log(`... ${name} (${kind}) ${progress}%`);
    //         break;
    //     }
    //   },
    //   (error) => {
    //     reject(error);
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log(`... ${name} (${kind}) available at ${downloadURL}%`);
    //       resolve(downloadURL);
    //     });
    //   }
    // );
  });
};

const saveImages = async (
  req: NextRequest
): Promise<DatabaseEntry<Picture>> => {
  const fileName = randomUUID().toString();
  let previewURL;
  let imageURL;
  const formData = await req.formData();
  const preview = formData.get("preview") as Blob | null;
  const image = formData.get("image") as Blob | null;
  const name = formData.get("name") as string | null;
  const width = (formData.get("width") as string) ?? "0";
  const height = (formData.get("height") as string) ?? "0";

  let imgId = "";

  try {
    if (!preview || !image) {
      throw new ServiceError(
        HttpStatusCode.BadRequest,
        "preview or image missing"
      );
    }

    console.log("begin uploading preview");
    previewURL = await uploadToStorage(
      name!,
      "preview",
      `previews/${fileName}`,
      await preview.arrayBuffer()
    );

    console.log("begin uploading image");
    imageURL = await uploadToStorage(
      name!,
      "image",
      `images/${fileName}`,
      await image.arrayBuffer()
    );

    const toSave = {
      name,
      description: formData.get("description")!.toString(),
      previewURL,
      imageURL,
      fileName,
      width: parseInt(width),
      height: parseInt(height),
      valid: formData.get("valid") === "true",
      tags: JSON.parse(formData.get("tags")!.toString()),
    } as Picture;

    await Promise.resolve(db.collection(PICTURES_COLLECTION).doc()).then(
      (ref) => {
        imgId = ref.id;
        return ref.set(toSave);
      }
    );

    return Promise.resolve({
      id: imgId,
      data: toSave as Picture,
    } as DatabaseEntry<Picture>);
  } catch (error) {
    deleteFromStorage(`previews/${fileName}`); // delete the image if it is already saved
    deleteFromStorage(`images/${fileName}`); // delete the image if it is already saved
    deleteFromDatabase(imgId); // delete the image if it is already saved
    console.error(`cannot upload files for ${name}`, error);
    return Promise.reject(error);
  }
};

const postHandler = async (req: NextRequest, res: NextResponse) => {
  const auth = await getSessionAndUser(req);
  return checkRole2(auth.user!.id, ["editor"])
    .then(() => {
      return saveImages(req);
    })
    .then((saved) => {
      return nextCreatedResponse({ ...saved });
    })
    .catch((error) => {
      return nextInternalError(error);
    });
};

export { postHandler as POST };
