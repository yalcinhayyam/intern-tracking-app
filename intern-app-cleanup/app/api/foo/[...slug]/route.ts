import withErrorHandler from "@/lib/utilities/error-handler";
import { NextRequest, NextResponse } from "next/server";
// async function handler(req: NextRequest) {
//   throw new Error("a == 0");
//   console.log(req.nextUrl.searchParams);
//   return NextResponse.json({ a: 10 });
// }

export const GET = withErrorHandler(async (req: NextRequest) => {
  // throw new Error("a == 0");
  console.log(req.nextUrl.searchParams);
  return NextResponse.json({ a: 10 });
});

// const enhancedHandler = withErrorHandler(handler);

// export { enhancedHandler as GET };



