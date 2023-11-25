import { Either, right, left } from "effect/Either";

export function Right<L, R>(value: R): Promise<Either<L, R>> {
  return Promise.resolve(right<R>(value));
}

export function Left<L, R>(value: L): Promise<Either<L, R>> {
  return Promise.resolve(left<L>(value));
}
