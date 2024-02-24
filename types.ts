// abstract class Failure {
//   abstract code: string;
// }

import { PrismaClient } from "@prisma/client";
import { Session as NextSession } from "next-auth";
import { AbstractValueProvider,Result } from "@/utilities";
import { InjectionToken } from "tsyringe";

export interface ILogger {
  log(value: any): void;
  info(value: any): void;
  error(value: any): void;
}

export interface IDateTimeProvider {
  get now(): Date;
}

export interface ISession extends NextSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}
// export type Context = {
//   session: ContextSession | null;
// };

export type Fail = string;

export type RegistryType<T extends string> = T;

export type EmptyArgs = {};

export type FailureType = "BUSINESS_FAILURE";
export type FailureInformationType<T extends string> = {
  code: T;
  message: string;
  type?: FailureType;
};

export interface IHandler {
  handle: Function;
}

export interface Callable<Type, Args> {
  (args: Args): Type;
}

export type IResult<Type> = Promise<Result<Fail, Type>>;

export abstract class AbstractHandler<Type, Args> implements IHandler {
  abstract handle(args: Args): IResult<Type>;
}
 
export interface IPipeline<Type, Args> {
  handle(args: Args, next: () => IResult<Type>): IResult<Type>
}

export type Handler<Type, Args> = AbstractHandler<Type, Args>["handle"];

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

export interface ICursor {
  value: string;
}

export type Query<T> =  Callable<
  {
    skip: number;
    take: number;
    cursor?: { id: string };
    orderBy: { id: "asc" | "desc" };
  },
  {
    first: number;
    after?: ICursor;
    orderBy: "asc" | "desc";
    fields: Projection<T>;
  }
>;

type Prisma = PrismaClient;

export interface IPrismaClient extends Prisma { }

export type Session = (
  injector: IInjector
) => Callable<Promise<ISession | null>, void>;

export interface IInjector {
  inject: <Type, Args>(
    token: InjectionToken<AbstractHandler<Type, Args>>
  ) => (args: Args) => IResult<Type>;

  service: <Type>(token: InjectionToken<Type>) => Type;
  provider: <Type>(
    token: InjectionToken<AbstractValueProvider<Type>>
  ) => AbstractValueProvider<Type>;
}
