import { DatabaseEntry } from "@framework/firebase.utils";
import {
  Article,
  ARTICLES_COLLECTION,
} from "@components/dashboard/article/model";
import { getFirestoreInstance } from "@app/api/utils";

export async function saveArticle(
  data: Article
): Promise<DatabaseEntry<Article>> {
  console.log("saving article", data);

  const db = getFirestoreInstance();

  let articleId = "";

  return new Promise((resolve, reject) => {
    Promise.resolve(db.collection(ARTICLES_COLLECTION).doc())
      .then((doc) => {
        articleId = doc.id;
        return doc.set(data);
      })
      .then(() => {
        resolve({ id: articleId, data } as DatabaseEntry<Article>);
      })
      .catch((error) => {
        console.error("cannot save article", data, error);
        reject(error);
      });
  });
}
