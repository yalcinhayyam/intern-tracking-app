// import { logError } from "@/lib/winston";
import { NextRequest, NextResponse } from "next/server";
import { injector } from "../di";
import {
  Context,
  ILogger,
  InjectorFactory,
  serverSession,
} from "@/lib/utilities";
import { LOGGER } from "../constants";
import { authChecker } from "./auth-checker";

export interface Request<T> extends NextRequest {
  json(): Promise<T>;
}
interface IPipeline<TRequest, TResponse> {
  (
    req: Request<TRequest>,
    injector: ReturnType<typeof InjectorFactory.create>,
    ctx: Context,
    ...args: any[]
  ): Promise<NextResponse<TResponse>>;
}

export const handler = <TRequest, TResponse>(
  pipelines: IPipeline<TRequest, TResponse>[],
  fn: IPipeline<TRequest, TResponse>
) => {
  return (request: Request<TRequest>, ...args: any[]) => {
    const runPipelines = async (
      pipelines: IPipeline<TRequest, TResponse>[]
    ): Promise<NextResponse<TResponse>> => {
      try {
        console.log(pipelines.length);
        if (pipelines.length == 0)
          return fn(
            request,
            injector,
            {
              session: await serverSession(),
            },
            ...args
          );
        const [currentPipeline, ...restPipelines] = pipelines;

        await currentPipeline(
          request,
          injector,
          {
            session: await serverSession(),
          },
          ...args
        );
        return runPipelines(restPipelines);
      } catch (error) {
        injector
          .service<ILogger>(LOGGER)
          .error({ error, requestBody: request, location: fn.name });
        if (error instanceof PipelineError) {
          return NextResponse.json(
            { message: error.message },
            { status: error.status }
          ) as NextResponse<TResponse>;
        }
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        ) as NextResponse<TResponse>;
      }
    };
    return runPipelines(pipelines);
  };
};

export const AuthorizationPipeline = <TRequest, TResponse>(
  roles: string[]
): IPipeline<TRequest, TResponse> => {
  return (req, injector, context, ...args): any => {
    if (!authChecker(context, roles)) {
      throw new PipelineError("Authentication Errrr", 401);
    }
  };
};

export class PipelineError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}
