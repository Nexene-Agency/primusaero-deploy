import {NextRequest, NextResponse} from "next/server";
import {safeParse} from "@framework/api/utils";
import {getRecaptchaScore} from "@framework/api/recaptcha";
import {ServiceError} from "@framework/api/service.error";
import {
  getFirestoreInstance,
  nextCreatedResponse,
  nextInternalError,
  serviceErrorAsNextResponse,
} from "@app/api/utils";
import {Contact, CONTACT_COLLECTION} from "@components/dashboard/contacts/model";

interface Payload {
  token: string;
  contact: Contact;
}

const postHandler = async (req: NextRequest, res: NextResponse) => {
  const payload: Payload = safeParse(await req.json());

  // FIXME: check article by joi

  const db = getFirestoreInstance();

  let contactId = "";

  return getRecaptchaScore(payload.token, "CONTACT_US")
    .then((score) => {
      console.log(
        "recaptcha score, can submit article",
        score.riskAnalysis.score
      );
      return db.collection(CONTACT_COLLECTION).doc();
    })
    .then((doc) => {
      contactId = doc.id;
      return doc.set(payload.contact as any);
    })
    .then(() => {
      return nextCreatedResponse({id: contactId, data: payload.contact});
    })
    .catch((error) => {
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export {postHandler as POST};
