import { LOGGER } from "@/lib/constants";
import { injector } from "@/lib/di";
import { Either, right, left } from "effect/Either";
import { fail, succeed, Exit } from "effect/Exit";
import { Fail, FailureInformationType, ILogger } from "@/lib/utilities";

export function Right<L, R>(value: R): Promise<Either<L, R>> {
  return Promise.resolve(right<R>(value));
}

export function Left<L, R>(value: L): Promise<Either<L, R>> {
  return Promise.resolve(left<L>(value));
}

export function Success<E, A>(value: A): Promise<Exit<E, A>> {
  injector.service<ILogger>(LOGGER).info({ Success: value });
  return Promise.resolve(succeed<A>(value));
}

export function Failure<E extends string, A>(
  value: FailureInformationType<E>
): Promise<Exit<E, A>> {
  injector.service<ILogger>(LOGGER).error(value);
  return Promise.resolve(fail<string>(value.code));
}
