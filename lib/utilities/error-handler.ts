// import { logError } from "@/lib/winston";
import { NextRequest, NextResponse } from "next/server";
function logError(...args: any[]) {
  console.log(args);
}

function withErrorHandler(
  fn: (req: NextRequest, ...args: any[]) => Promise<NextResponse>
) {
  return async function (request: NextRequest, ...args: any[]) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      // Log the error to a logging system
      logError({ error, requestBody: request, location: fn.name });
      // Respond with a generic 500 Internal Server Error
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}

export default withErrorHandler;
