import { NextRequest, NextResponse } from "next/server";
import { Request,PipelineError } from "@/lib/utilities/handler";


function logError(...args: any[]) {
  console.log(args);
}



function withErrorHandler<TRequest, TResponse>(
  fn: (
    request: Request<TRequest>,
    ...args: any[]
  ) => Promise<NextResponse<TResponse>>
) {
  return async function (request: Request<TRequest>, ...args: any[]) {
    try {
      return await fn(request, ...args);
    } catch (error) {
      // Log the error to a logging system
      logError({ error, requestBody: request, location: fn.name });
      // Respond with a generic 500 Internal Server Error
      switch (error) {
        case error instanceof PipelineError:
          return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          ) as NextResponse<TResponse>;
        default:
          return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
          ) as NextResponse<TResponse>;
      }
    }
  };
}
// interface IContext {
//   session: Session | null;
// }


export default withErrorHandler;


