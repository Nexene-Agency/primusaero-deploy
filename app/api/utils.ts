import { NextRequest, NextResponse } from "next/server";
import { AdapterSession, AdapterUser } from "next-auth/adapters";
import { authOptions } from "@components/firebase/auth.options";
import { HttpStatusCode } from "axios";
import { ServiceError } from "@/framework/api/service.error";

import admin from "firebase-admin";

export const getFirestoreInstance = () => {
  return admin.firestore();
};
export const getStorageInstance = () => {
  return admin.storage();
};

export const getSession = (req: NextRequest): string | undefined => {
  // console.log("getSession cookies", JSON.stringify(req.cookies.getAll()));
  const cookie =
    req.cookies.get("next-auth.session-token") ??
    req.cookies.get("__Secure-next-auth.session-token");
  // console.log("returning cookie", cookie?.value);
  return cookie?.value;
};

export const getSessionAndUser = async (
  req: NextRequest
): Promise<{ session?: AdapterSession; user?: AdapterUser }> => {
  const sessionId = getSession(req);
  // console.log("got session ID", sessionId);
  if (!sessionId) {
    return Promise.resolve({ session: undefined, user: undefined });
  }

  const result = await authOptions.adapter!.getSessionAndUser(sessionId!);
  // console.log("got session and user", result?.session, result?.user);
  if (!result || !result.session) {
    return Promise.resolve({ session: undefined, user: undefined });
  }

  return Promise.resolve(result);
};

export const nextAccessDeniedResponse = (body: any = {}) => {
  return NextResponse.json(body, {
    status: HttpStatusCode.Forbidden,
  });
};

export const nextNotFoundResponse = (body: any = {}) => {
  return NextResponse.json(body, {
    status: HttpStatusCode.NotFound,
  });
};

export const nextOkResponse = (body: any = {}) => {
  return NextResponse.json(body, {
    status: HttpStatusCode.Ok,
  });
};

export const nextCreatedResponse = (body: any = {}) => {
  return NextResponse.json(body, {
    status: HttpStatusCode.Created,
  });
};

export const serviceErrorAsNextResponse = (error: ServiceError) => {
  return NextResponse.json(error, { status: error.code });
};

export const nextInternalError = (error: ServiceError) => {
  console.log("internal error", error);
  return NextResponse.json(
    { error: `${error}` },
    { status: HttpStatusCode.InternalServerError }
  );
};
