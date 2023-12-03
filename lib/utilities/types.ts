import { Either } from "effect/Either";
import { Exit } from "effect/Exit";
import { Session } from "next-auth";

// export abstract class Failure {
//   abstract code: string;
// }
interface ContextSession extends Session {
  role?: string;
}
export type Context = {
  session: ContextSession | null;
};

export type Fail = string;

export type RegistryType<T extends string> = T;

export interface IHandler {
  handle: Function;
}
export interface Callable<Type, Args> {
  (args: Args): Result<Type>;
}

export type Result<Type> = Promise<Exit<Fail, Type>>;
export type EitherResult<Type> = Promise<Either<Fail, Type>>;

export abstract class AbstractHandlerEither<Type, Args> implements IHandler {
  abstract handle(args: Args): EitherResult<Type>;
}

export abstract class AbstractHandler<Type, Args> implements IHandler {
  abstract handle(args: Args): Result<Type>;
}

export type Handler<Type, Args> = AbstractHandler<Type, Args>["handle"];

export type INode<T> = { [K in keyof T]?: T[K] } & { id: string };

export interface ICursor {
  value: string;
}
export interface IConnection<T> {
  edges: IEdge<T>[];
  pageInfo: IPageInfo;
}

export interface IEdge<T> {
  cursor: ICursor;
  node: INode<T>;
}

export interface IPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: ICursor;
  endCursor?: ICursor;
}

export type Projection<T> = {
  select: {
    [key in keyof T]: T[key] extends Array<infer U>
      ? U extends object
        ? Projection<U>
        : boolean
      : T[key] extends object
      ? Projection<T[key]>
      : boolean;
  };
};

export type EmptyObject = {
  [key: string]: EmptyObject | boolean;
};