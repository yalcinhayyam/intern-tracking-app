import { CONTEXT, DATE_TIME_PROVIDER, LOGGER } from "@/lib/constants";
import { injector } from "@/lib/di";
import { Either, right, left } from "effect/Either";
import { fail, succeed, Exit } from "effect/Exit";
import { Context, FailureInformationType, IDateTimeProvider, ILogger } from "@/lib/utilities";

const logger = injector.service<ILogger>(LOGGER);
const dateTimeProvider =
  injector.service<IDateTimeProvider>(DATE_TIME_PROVIDER);
export function Right<L, R>(value: R): Promise<Either<L, R>> {
  return Promise.resolve(right<R>(value));
}

export function Left<L, R>(value: L): Promise<Either<L, R>> {
  return Promise.resolve(left<L>(value));
}

export function Success<E, A>(value: A, ...args: any[]): Promise<Exit<E, A>> {
  const context = injector.provider<Context>(CONTEXT);
  logger.info({
    Success: { value },
    args,
    user: context.value.session?.user,
    date: dateTimeProvider.now,
  });
  return Promise.resolve(succeed<A>(value));
}

export function Failure<E extends string, A>(
  value: FailureInformationType<E>,
  ...args: any[]
): Promise<Exit<E | string, A>> {
  const context = injector.provider<Context>(CONTEXT);
  logger.error({
    Failure: { value },
    args,
    user: context.value.session?.user,
    date: dateTimeProvider.now,
  });

  return Promise.resolve(fail<string>(value.code));
}
