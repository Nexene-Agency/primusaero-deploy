import { NextRequest, NextResponse } from "next/server";
import { checkRole2, safeParse } from "@framework/api/utils";
import { ARTICLES_COLLECTION } from "@components/dashboard/article/model";
import { ServiceError } from "@framework/api/service.error";
import {
  getFirestoreInstance,
  getSessionAndUser,
  nextAccessDeniedResponse,
  nextInternalError,
  nextOkResponse,
  serviceErrorAsNextResponse,
} from "@app/api/utils";

interface Payload {
  id: string;
}

const putHandler = async (req: NextRequest, res: NextResponse) => {
  const auth = await getSessionAndUser(req);
  const payload: Payload = safeParse(await req.json());

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  const db = getFirestoreInstance();

  return checkRole2(auth.user!.id, ["editor"])
    .then(() => {
      return db.collection(ARTICLES_COLLECTION).doc(payload.id).update({
        processed: new Date().toISOString(),
        processedBy: auth.user!.email,
      });
    })
    .then((indexed) => {
      return nextOkResponse();
    })
    .catch((error) => {
      console.error(error);
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export { putHandler as PUT };
