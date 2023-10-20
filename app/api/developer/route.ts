// This is an example of how to access a session from an API route
import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";

const developerKey = "pa-881464-8b656";
const getHandler = async (req: NextRequest, res: NextResponse) => {
  const url = new URL(req.url);
  const text = url.searchParams.get("key") ?? "0";

  console.log("got key", text);
  const result: string = text !== developerKey ? "/" : "/api/auth/signin";

  return new Promise((resolve, reject) => {
    resolve(
      NextResponse.json({ continue: result }, { status: HttpStatusCode.Ok })
    );
  });
};

export { getHandler as GET };
