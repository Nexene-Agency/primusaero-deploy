import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "@framework/api/utils";
import {
  Article,
  ARTICLES_COLLECTION,
} from "@components/dashboard/article/model";
import { getRecaptchaScore } from "@framework/api/recaptcha";
import { ServiceError } from "@framework/api/service.error";
import {
  getFirestoreInstance,
  nextCreatedResponse,
  nextInternalError,
  serviceErrorAsNextResponse,
} from "@app/api/utils";

interface Payload {
  token: string;
  article: Article;
}

const postHandler = async (req: NextRequest, res: NextResponse) => {
  const payload: Payload = safeParse(await req.json());

  // FIXME: check article by joi

  const db = getFirestoreInstance();

  let articleId = "";

  return getRecaptchaScore(payload.token, "ARTICLE_SUBMIT")
    .then((score) => {
      console.log(
        "recaptcha score, can submit article",
        score.riskAnalysis.score
      );
      return db.collection(ARTICLES_COLLECTION).doc();
    })
    .then((doc) => {
      articleId = doc.id;
      return doc.set(payload.article);
    })
    .then(() => {
      return nextCreatedResponse({ id: articleId, data: payload.article });
    })
    .catch((error) => {
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export { postHandler as POST };
