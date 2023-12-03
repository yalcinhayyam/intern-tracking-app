import { LOGGER } from "@/lib/constants";
import { injector } from "@/lib/di";
import { Either, right, left } from "effect/Either";
import { fail, succeed, Exit } from "effect/Exit";
import { ILogger } from "@/lib/utilities";

export function Right<L, R>(value: R): Promise<Either<L, R>> {
  return Promise.resolve(right<R>(value));
}

export function Left<L, R>(value: L): Promise<Either<L, R>> {
  return Promise.resolve(left<L>(value));
}

export function Success<L, R>(value: R): Promise<Exit<L, R>> {
  injector.service<ILogger>(LOGGER).info(value);
  return Promise.resolve(succeed<R>(value));
}

export function Failure<L, R>(value: L): Promise<Exit<L, R>> {
  injector.service<ILogger>(LOGGER).error(Object.keys({value})[0]);
  return Promise.resolve(fail<L>(value));
}
