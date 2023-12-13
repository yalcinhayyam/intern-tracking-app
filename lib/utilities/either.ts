import { CONTEXT, DATE_TIME_PROVIDER, LOGGER } from "@/lib/constants";
import { injector } from "@/lib/di";
import { Either, right, left } from "effect/Either";
import { fail, succeed, Exit } from "effect/Exit";
import {
  Context,
  FailureInformationType,
  IDateTimeProvider,
  ILogger,
} from "@/lib/utilities";


export function Right<E, A>(value: A, ...args: any[]): Promise<Either<E, A>> {
  const logger = injector.service<ILogger>(LOGGER);
  const dateTimeProvider =
    injector.service<IDateTimeProvider>(DATE_TIME_PROVIDER);
  const context = injector.provider<Context>(CONTEXT);
  logger.info({
    Success: { value },
    args,
    user: context.value.session?.user,
    date: dateTimeProvider.now,
  });
  return Promise.resolve(right<A>(value));
}

export function Left<E extends string, A>(
  value: FailureInformationType<E>,
  ...args: any[]
): Promise<Either<E | string, A>> {
  const logger = injector.service<ILogger>(LOGGER);
  const dateTimeProvider =
    injector.service<IDateTimeProvider>(DATE_TIME_PROVIDER);

  const context = injector.provider<Context>(CONTEXT);
  logger.error({
    Failure: { value },
    args,
    user: context.value.session?.user,
    date: dateTimeProvider.now,
  });

  return Promise.resolve(left<string>(value.message));
}
