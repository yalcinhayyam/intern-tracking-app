import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.nextUrl.searchParams);
  console.log(req.nextUrl.searchParams.get('a'));
  // throw new Error()
  return NextResponse.json({ a:10 });
}
