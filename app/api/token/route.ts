// This is an example of how to access a session from an API route
import { getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { authOptions } from "@components/firebase/auth.options";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@app/api/utils";

const handler = async (req: NextRequest, res: NextResponse) => {
  const sessionId = getSession(req);
  console.log("getting session", sessionId);
  if (!sessionId) {
    return NextResponse.json({ error: "no session" }, { status: 401 });
  }
  // @ts-ignore
  const { session, user } = await authOptions.adapter!.getSessionAndUser(
    sessionId!
  );
  const customToken = await getAuth(getApp()).createCustomToken(user?.id!);
  return NextResponse.json({ token: customToken });
};

export { handler as GET };
