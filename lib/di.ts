
import {
  CREATE_BOOK_HANDLER,
  GET_BOOKS_HANDLER,
  GET_USER_HANDLER,
  LOGGER,
  PRISMA_CLIENT,
} from "@/lib/constants";
import { container, injectable } from "tsyringe";

import { PrismaClient as Client } from "@prisma/client";
import { ConsoleLogger, InjectorFactory } from "@/lib/utilities";
import {
  CreateBookHandler,
  GetBooksHandler,
  GetUserHandler,
} from "./use-cases";
@injectable()
export class PrismaClient extends Client {}

// var client = new PrismaClient();
// // await client.$connect()
// // container.register(PRISMA_CLIENT, PrismaClient);
// container.registerInstance(PRISMA_CLIENT, client);

container.register(PRISMA_CLIENT, PrismaClient);
container.register(LOGGER, ConsoleLogger);

container.register(GET_BOOKS_HANDLER, GetBooksHandler);
container.register(CREATE_BOOK_HANDLER, CreateBookHandler);
container.register(GET_USER_HANDLER, GetUserHandler);

// container.registerInstance(
//   GET_USER_HANDLER,
//   container.resolve<IHandler>(GET_USER_HANDLER).handle
// );

export const injector = InjectorFactory.create(container);

// console.log(await (container.resolve(GET_USER_HANDLER) as any)({ email: "" }));

export { container };
