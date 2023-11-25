import { Either } from "effect/Either";

export abstract class Failure {}

export type RegistryType<T extends string> = T;

export interface IHandler {
  handle: Function;
}

export abstract class AbstractHandler<Type, Args> implements IHandler {
  abstract handle(args: Args): Promise<Either<Failure, Type>>;
}

export type Callable<Type, Args> = AbstractHandler<Type, Args>["handle"];

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
