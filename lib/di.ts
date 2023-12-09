import "reflect-metadata";
import {
  CONTEXT,
  CREATE_BOOK_HANDLER,
  CREATE_USER_HANDLER,
  DATE_TIME_PROVIDER,
  GET_BOOKS_HANDLER,
  GET_USER_HANDLER,
  LOGGER,
  PRISMA_CLIENT,
  USER_SERVICE,
} from "@/lib/constants";
import { container, injectable } from "tsyringe";

import { PrismaClient as Client } from "@prisma/client";
import {
  ConsoleLogger,
  Context,
  InjectorFactory,
  ValueProvider,
} from "@/lib/utilities";
import {
  CreateBookHandler,
  CreateUserHandler,
  GetBooksHandler,
  GetUserHandler,
} from "./use-cases";
import { UserService } from "./services";
@injectable()
export class PrismaClient extends Client {}

// var client = new PrismaClient();
// // await client.$connect()
// // container.register(PRISMA_CLIENT, PrismaClient);
// container.registerInstance(PRISMA_CLIENT, client);

export class ContextValueProvider implements ValueProvider<Context> {
  constructor(private _value: Context) {}

  update = (value: Context) => {
    this._value = value;
  };
  get value(): Context {
    if (!this._value) {
      this._value = {
        session: null,
      };
    }
    return this._value;
  }
}



export interface IDateTimeProvider {
  get now(): Date;
}

class DateTimeProvider implements IDateTimeProvider {
  get now(): Date {
    return new Date(Date.now());
  }
}


container.registerInstance<ValueProvider<Context>>(
  CONTEXT,
  new ContextValueProvider({
    session: null,
  })
);

// Services
container.register(PRISMA_CLIENT, PrismaClient);
container.register(LOGGER, ConsoleLogger);
container.register(USER_SERVICE, UserService);
container.register(DATE_TIME_PROVIDER, DateTimeProvider);

// Book
container.register(GET_BOOKS_HANDLER, GetBooksHandler);
container.register(CREATE_BOOK_HANDLER, CreateBookHandler);

// User
container.register(GET_USER_HANDLER, GetUserHandler);
container.register(CREATE_USER_HANDLER, CreateUserHandler);

// container.registerInstance(
//   GET_USER_HANDLER,
//   container.resolve<IHandler>(GET_USER_HANDLER).handle
// );

export const injector = InjectorFactory.create(container);

// console.log(await (container.resolve(GET_USER_HANDLER) as any)({ email: "" }));

export { container };
