import { NextRequest, NextResponse } from "next/server";
import { Request, PipelineError } from "@/lib/utilities/handler";
import { injector } from "../di";
import { ILogger } from ".";
import { LOGGER } from "../constants";

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
      injector
        .service<ILogger>(LOGGER)
        .error({ error, requestBody: request, location: fn.name });
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


export default withErrorHandler;
