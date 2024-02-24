import {
  FailureInformationType,
  IDateTimeProvider,
  ILogger,
  Session,
} from "@/types";
import { DATE_TIME_PROVIDER, LOGGER, SESSION } from "@/constants";
import { injector } from "@/di";
import { Result } from "@/utilities";

export async function Right<E, A>(
  value: A,
  ...args: any[]
): Promise<Result<E, A>> {
  // const logger = injector.service<ILogger>(LOGGER);
  // const dateTimeProvider =
  //   injector.service<IDateTimeProvider>(DATE_TIME_PROVIDER);
  // const session = await injector.service<ReturnType<Session>>(SESSION)();
  // logger.info({
  //   Success: { value },
  //   args,
  //   user: session?.user,
  //   date: dateTimeProvider.now,
  // });
  return Promise.resolve(Result.fromSuccess<A>(value));
}

export async function Left<E extends string, A>(
  value: FailureInformationType<E>,
  ...args: any[]
): Promise<Result<E | string, A>> {
  const logger = injector.service<ILogger>(LOGGER);
  const dateTimeProvider =
    injector.service<IDateTimeProvider>(DATE_TIME_PROVIDER);

  const session = await injector.service<ReturnType<Session>>(SESSION)();

  logger.error({
    Failure: { value },
    args,
    user: session?.user,
    date: dateTimeProvider.now,
  });

  return Promise.resolve(Result.fromError<string>(value.message));
}
