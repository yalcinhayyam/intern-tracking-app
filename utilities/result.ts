import {
  isLeft,
  Either,
  left,
  right,
  isRight,
  match as eitherMatch,
} from "effect/Either";

export class Result<E, A> {
  private constructor(private _value: Either<E, A>) {}

  get isError() {
    return isLeft(this._value);
  }

  get isSuccess() {
    return isRight(this._value);
  }

  static fromError<T>(error: T) {
    return new Result<T, never>(left(error));
  }

  static fromSuccess<T>(value: T) {
    return new Result<never, T>(right(value));
  }

  get success() {
    if (isRight(this._value)) {
      return this._value.right;
    }
    throw new Error(`//!Result success value not defined!\\`);
  }

  get error() {
    if (isLeft(this._value)) {
      return this._value.left;
    }
    throw new Error(`//!Result error value not defined!\\`);
  }

  match<B, C = B>(
    args: Parameters<typeof eitherMatch<E, A, C, B>>[1]
  ): ReturnType<typeof eitherMatch<E, A, C, B>> {
    return eitherMatch<E, A, C, B>(this._value, args);
  }
}
