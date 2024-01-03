// This is an example of how to access a session from an API route
import {NextRequest} from "next/server";
import {
  getFirestoreInstance,
  getSessionAndUser,
  nextAccessDeniedResponse,
  nextCreatedResponse,
  nextInternalError,
  nextNotFoundResponse,
  nextOkResponse,
  serviceErrorAsNextResponse,
} from "@app/api/utils";
import {safeParse} from "secure-json-parse";
import {checkRole2} from "@framework/api/utils";
import {ServiceError} from "@framework/api/service.error";

const db = getFirestoreInstance();

/** authenticated users can read the document */
const getHandler = async (
  req: NextRequest,
  {params}: { params: { table: string; id: string } }
) => {
  const auth = await getSessionAndUser(req);
  const failWhenNotFound = !!req.nextUrl.searchParams.get("f");

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  if (params.id.includes("||")) {
    params.id = params.id.replaceAll("||", "/");
    console.log("composite ID detected, replaced: ", params.id);
  }

  return checkRole2(auth.user!.id, ["user"])
    .then(() => {
      return db.collection(params.table).doc(params.id).get();
    })
    .then((doc) => {
      if (doc.exists) {
        return nextOkResponse({id: params.id, data: doc.data()});
      } else {
        if (failWhenNotFound) {
          return nextNotFoundResponse();
        } else {
          return nextOkResponse({data: {}});
        }
      }
    })
    .catch((error) => {
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

/** authenticated users can create a document */
const postHandler = async (
  req: NextRequest,
  {params}: { params: { table: string; id: string } }
) => {
  const auth = await getSessionAndUser(req);
  const payload = safeParse(await req.text()); // add checking here

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  let newDocumentId: string | undefined = undefined;

  return checkRole2(auth.user!.id, ["user"])
    .then(() => {
      return db.collection(params.table).doc();
    })
    .then((doc) => {
      newDocumentId = doc.id;
      return doc.set(payload);
    })
    .then(() => {
      return nextCreatedResponse({id: newDocumentId, data: payload});
    })
    .catch((error) => {
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

/** authenticated users can modify a document */
const putHandler = async (
  req: NextRequest,
  {params}: { params: { table: string; id: string } }
) => {
  const auth = await getSessionAndUser(req);
  const payload = safeParse(await req.text()); // add checking here
  const merge = req.nextUrl.searchParams.get("m") ? true : false;

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  if (params.id.includes("||")) {
    params.id = params.id.replaceAll("||", "/");
    console.log("composite ID detected, replaced: ", params.id);
  }

  return checkRole2(auth.user!.id, ["user"])
    .then(() => {
      return db
        .collection(params.table)
        .doc(params.id)
        .set(payload.data, {merge});
    })
    .then(() => {
      return nextOkResponse({id: params.id, data: payload.data});
    })
    .catch((error) => {
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

/** authenticated users can delete a document */
const deleteHandler = async (
  req: NextRequest,
  {params}: { params: { table: string; id: string } }
) => {
  const auth = await getSessionAndUser(req);

  if (!auth.user) {
    return nextAccessDeniedResponse();
  }

  return checkRole2(auth.user!.id, ["admin", "editor"])
    .then(() => {
      return db.collection(params.table).doc(params.id).delete();
    })
    .then(() => {
      return nextOkResponse();
    })
    .catch((error) => {
      if (error instanceof ServiceError) {
        return serviceErrorAsNextResponse(error);
      } else {
        return nextInternalError(error);
      }
    });
};

export {
  postHandler as POST,
  putHandler as PUT,
  getHandler as GET,
  deleteHandler as DELETE,
};
