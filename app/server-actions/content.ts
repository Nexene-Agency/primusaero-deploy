"use server";
import {asDatabaseEntries2, DatabaseEntry,} from "@framework/firebase.utils";
import {getFirestoreInstance} from "@app/api/utils";
import {
  CONTENT_BLOCKS_COLLECTION,
  ContentBlock,
  ContentFile,
  ContentFileVersion,
  PUBLISHED_FILES_COLLECTION
} from "@components/dashboard/contents/model";

export interface ContentResponse {
  contentFiles: DatabaseEntry<ContentFile>[]; // the content files
  contentFileVersions: DatabaseEntry<ContentFileVersion>[]; // the versions for the content files
  blockDefinitions: DatabaseEntry<ContentBlock>[]; // the block definitions
  similarFiles: DatabaseEntry<ContentFile>[]; // the similar files
}

async function loadCurrentContentFileVersion(file: DatabaseEntry<ContentFile>): Promise<DatabaseEntry<ContentFileVersion>> {
  const db = getFirestoreInstance();

  const actualVersion = file.data.publishedVersion || file.data.version; // either the published version or the current version
  const collection = `files/${file.id}/versions`;
  console.log("loading content file version", collection, actualVersion);

  return new Promise((resolve) => {
    db.collection(collection)
      .doc(actualVersion.toString())
      .get()
      .then((doc) => {
        console.log("loaded content file version", collection, actualVersion, "as", doc.data());
        resolve({id: doc.id, data: doc.data()} as DatabaseEntry<ContentFileVersion>);
      })
      .catch((error) => {
        console.error("cannot read content file version", collection, actualVersion, "due to", error);
        resolve({id: "", data: {} as any} as DatabaseEntry<ContentFileVersion>);
      });
  });
}


export async function getPublishedContent(code: string): Promise<ContentResponse> {
  console.log("loading content for", code);

  const db = getFirestoreInstance();

  return new Promise<ContentResponse>((resolve) => {
    const result = {
      contentFiles: [] as DatabaseEntry<ContentFile>[],
      contentFileVersions: [] as DatabaseEntry<ContentFileVersion>[],
      blockDefinitions: [] as DatabaseEntry<ContentBlock>[],
      similarFiles: [] as DatabaseEntry<ContentFile>[],
    } as ContentResponse;

    db.collection(CONTENT_BLOCKS_COLLECTION)
      .limit(100) // just loading the content block definitios
      .get()
      .then((hits) => {
        return asDatabaseEntries2<ContentBlock>(hits);
      })
      .then((blocks) => {
        result.blockDefinitions = blocks;
        return db.collection(PUBLISHED_FILES_COLLECTION)
          .where("code", "==", code)
          // .where("valid", "==", true), not needed, invalid files are automatically revoked
          .limit(32)
          .get();
      })
      .then((hits) => {
        return asDatabaseEntries2<ContentFile>(hits);
      })
      .then((files) => {
        result.contentFiles = files; // the content files
        const versions: Promise<DatabaseEntry<ContentFileVersion>>[] = [];
        files.forEach((file) => versions.push(loadCurrentContentFileVersion(file)));
        return Promise.all(versions);
      })
      .then((hits) => {
        result.contentFileVersions = hits;
        // now everything loaded regarding the current code, now we need to load the similar files:

        const similarCodes: string[] = [];
        result.contentFiles.forEach((file) => {
          file.data.similars.forEach((similar) => {
            if (!similarCodes.includes(similar)) {
              similarCodes.push(similar);
            }
          });
        });

        return db.collection(PUBLISHED_FILES_COLLECTION)
          .where("topics", "array-contains-any", similarCodes.slice(0, 30))
          .orderBy("publishedAt", "desc")
          .get();
      })
      .then((hits) => {
        return asDatabaseEntries2<ContentFile>(hits);
      })
      .then((files) => {
        result.similarFiles = files;
        console.log("returning content", result);
        resolve(result);
      })
      .catch((error) => {
        console.error("cannot read content", code, "due to", error);
        resolve(result);
      });
  });
}

export async function getPublishedFiles(codes: string[]): Promise<ContentResponse> {
  console.log("loading published files for", codes);

  // FIXME: multilang entries not handled yet, they are repeated

  const db = getFirestoreInstance();

  return new Promise<ContentResponse>((resolve) => {
    const result = {
      contentFiles: [] as DatabaseEntry<ContentFile>[],
      contentFileVersions: [] as DatabaseEntry<ContentFileVersion>[],
      blockDefinitions: [] as DatabaseEntry<ContentBlock>[],
      similarFiles: [] as DatabaseEntry<ContentFile>[],
    } as ContentResponse;

    db.collection(PUBLISHED_FILES_COLLECTION)
      .where("topics", "array-contains-any", codes)
      .orderBy("publishedAt", "desc")
      .get()
      .then((hits) => {
        return asDatabaseEntries2<ContentFile>(hits);
      })
      .then((files) => {
        result.contentFiles = files;
        resolve(result);
      })
      .catch((error) => {
        console.error("cannot read published content [", codes.join(","), "] due to", error);
        resolve(result);
      });
  });
}
