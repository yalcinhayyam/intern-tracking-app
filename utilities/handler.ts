import { NextRequest, NextResponse } from "next/server";
import { injector } from "@/di";
import { InjectorFactory, authChecker } from "@/utilities";
import { LOGGER, SESSION } from "@/constants";
import { ILogger, Session } from "@/types";

export interface Request<T> extends NextRequest {
  json(): Promise<T>;
}
interface IPipeline<TRequest, TResponse> {
  (
    req: Request<TRequest>,
    injector: ReturnType<typeof InjectorFactory.create>,
    ...args: any[]
  ): Promise<NextResponse<TResponse>>;
}

export const handler =
  <TRequest, TResponse>(pipelines: IPipeline<TRequest, TResponse>[]) =>
  (fn: IPipeline<TRequest, TResponse>) => {
    return (request: Request<TRequest>, ...args: any[]) => {
      const runPipelines = async (
        pipelines: IPipeline<TRequest, TResponse>[]
      ): Promise<NextResponse<TResponse>> => {
        try {
          if (pipelines.length == 0) return fn(request, injector, ...args);
          const [currentPipeline, ...restPipelines] = pipelines;

          await currentPipeline(
            request,
            injector,

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
  return async (req, injector, ...args): Promise<any> => {
    if (
      !authChecker(
        await injector.service<ReturnType<Session>>(SESSION)(),
        roles
      )
    ) {
      throw new PipelineError("Authentication Errrr", 401);
    }
  };
};

export class PipelineError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}
