// This is an example of how to access a session from an API route
import { NextRequest, NextResponse } from "next/server";
import { getSessionAndUser } from "@app/api/utils";

const handler = async (req: NextRequest, res: NextResponse) => {
  const auth = await getSessionAndUser(req);
  return Promise.resolve(NextResponse.json(auth, { status: 200 }));
};

export { handler as GET };
