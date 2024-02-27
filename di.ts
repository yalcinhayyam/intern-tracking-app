import "reflect-metadata";
import { AuthOptions, getServerSession } from "next-auth";

import {
  AUTH_OPTIONS,
  BOOK_REPOSITORY,
  COMPARE_PASSWORD,
  CREATE_BOOK_HANDLER,
  CREATE_USER_HANDLER,
  DATE_TIME_PROVIDER,
  GET_BOOKS_HANDLER,
  GET_USER_HANDLER,
  LOGGER,
  PIPELINE_WRAPPER_CONTEXT,
  QUERY,
  SESSION,
  USER_REPOSITORY,
  USER_SERVICE,
} from "@/constants";
import { container } from "tsyringe";

import {
  ComparePassword,
  ConsoleLogger,
  InjectorFactory,
  authOptions,
  comparePassword,
  query,
  DateTimeProvider,

} from "@/utilities";
import {
  CreateBookHandler,
  CreateUserHandler,
  GetBooksHandler,
  GetUserHandler,
} from "@/use-cases";
import { UserService } from "@/services";
import { Callable, Session } from "@/types";

import { PrismaBookRepository, PrismaUserRepository } from "@/repository";

export const injector = InjectorFactory.create(container);

// var client = new PrismaClient();
// // await client.$connect()
// // container.register(PRISMA_CLIENT, PrismaClient);
import { PrismaClient as Client } from "@prisma/client";

import { singleton } from "tsyringe";

// container.registerInstance(PRISMA_CLIENT, client);
@singleton()
export class PrismaClient extends Client {}

const _authOptions = authOptions(injector);
const _query = query(injector);

// Values
container.register(AUTH_OPTIONS, {
  useValue: _authOptions,
});

// Utilities
container.register(QUERY, { useValue: _query });

container.register<ReturnType<Session>>(SESSION, {
  useValue: () =>
    getServerSession(
      container.resolve<Callable<AuthOptions, void>>(AUTH_OPTIONS)()
    ),
});

container.register<ReturnType<ComparePassword>>(COMPARE_PASSWORD, {
  useValue: comparePassword(injector),
});

container.registerSingleton(LOGGER, ConsoleLogger);
container.registerSingleton(DATE_TIME_PROVIDER, DateTimeProvider);

// Repository
container.registerSingleton(USER_REPOSITORY, PrismaUserRepository);
container.registerSingleton(BOOK_REPOSITORY, PrismaBookRepository);

// Services
container.registerSingleton(USER_SERVICE, UserService);

// Book
container.register(GET_BOOKS_HANDLER, GetBooksHandler);
container.register(CREATE_BOOK_HANDLER, CreateBookHandler);

// User
container.register(GET_USER_HANDLER, GetUserHandler);
container.register(CREATE_USER_HANDLER, CreateUserHandler);

export { container };
