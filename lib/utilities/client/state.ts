export interface IState<T> {
  readonly value: T | undefined | null;
  readonly error: Error | string | undefined | null;
  readonly loading: boolean;
}

export function Loading<T>(): IState<T> {
  return {
    error: undefined,
    loading: false,
    value: undefined,
  };
}

export function Success<T>(value: T): IState<T> {
  return {
    error: undefined,
    loading: true,
    value,
  };
}

export function Exception<T>(error: string | Error): IState<T> {
  return {
    error,
    loading: false,
    value: undefined,
  };
}

// interface IBook {
//   title: string;
// }

// const state: IState<IBook> = Success({ title: "" });
