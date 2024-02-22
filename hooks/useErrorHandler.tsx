import { LOGGER, UNEXPECTED_ERROR } from "@/constants";
import { injector } from "@/di";
import { AbstractHandler, IInjector, ILogger, Result } from "@/types";
import { left } from "effect/Either";

export async function useErrorHandlerCallback<T>(
    cb: (injector: IInjector) => Promise<T>
): Promise<[T | null, boolean]> {
    try {
        return [await cb(injector), true];
    } catch (e) {
        injector.service<ILogger>(LOGGER).error(e);
        return [null, false];
    }
}

type Constructor<Type, Args> = new (...args: any[]) => AbstractHandler<Type, Args>

export async function useErrorHandler<Type, Args>(
    cb: (injector: IInjector) => ((args: Args) => Result<Type>)
){
    return async (args:Args) => {
        try {
            return await cb(injector)(args);
        } catch (e) {
            injector.service<ILogger>(LOGGER).error(e);
            return left(UNEXPECTED_ERROR)
        }
    };
}
