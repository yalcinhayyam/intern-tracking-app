import { LOGGER } from "@/constants";
import { injector } from "@/di";
import { AbstractHandler, IInjector, ILogger, IResult } from "@/types";
import { Left } from "@/utilities";
import { InjectionToken } from "tsyringe";

export async function useErrorHandler<T>(
  cb: (injector: IInjector) => Promise<T>
): Promise<[T | null, boolean]> {
  try {
    return [await cb(injector), true];
  } catch (e) {
    injector.service<ILogger>(LOGGER).error(e);
    return [null, false];
  }
}

export async function useWrappedErrorHandler<Type, Args>(
  token: InjectionToken<AbstractHandler<Type, Args>>
) {
  return async (args: Args): IResult<Type> => {
    try {
      return await injector.inject<Type, Args>(token)(args);
    } catch (e) {
      injector.service<ILogger>(LOGGER).error(e);
      return Left(UNEXPECTED_ERROR);
    }
  };
}

const UNEXPECTED_ERROR = "" as any;
