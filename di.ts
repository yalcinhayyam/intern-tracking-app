import "reflect-metadata";
import { AuthOptions, getServerSession } from "next-auth";

import {
  AUTH_OPTIONS,
  COMPARE_PASSWORD,
  CREATE_BOOK_HANDLER,
  CREATE_INTERNSHIP_HANDLER,
  CREATE_USER_HANDLER,
  DATE_TIME_PROVIDER,
  GET_BOOKS_HANDLER,
  GET_USER_HANDLER,
  LOGGER,
  PRISMA_CLIENT,
  QUERY,
  SESSION,
  USER_SERVICE,
} from "@/constants";
import { container, singleton } from "tsyringe";

import { PrismaClient as Client } from "@prisma/client";
import {
  ComparePassword,
  ConsoleLogger,
  InjectorFactory,
  authOptions,
  comparePassword,
  query,
} from "@/utilities";
import {
  CreateBookHandler,
  CreateInternshipHandler,
  CreateUserHandler,
  GetBooksHandler,
  GetUserHandler,
} from "@/use-cases";
import { UserService } from "@/services";
import { Callable, Session } from "@/types";
import { DateTimeProvider } from "@/utilities/";

export const injector = InjectorFactory.create(container);

// var client = new PrismaClient();
// // await client.$connect()
// // container.register(PRISMA_CLIENT, PrismaClient);
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

container.registerSingleton(PRISMA_CLIENT, PrismaClient);
container.registerSingleton(LOGGER, ConsoleLogger);
container.registerSingleton(DATE_TIME_PROVIDER, DateTimeProvider);

// Services
container.registerSingleton(USER_SERVICE, UserService);

// Book
container.register(GET_BOOKS_HANDLER, GetBooksHandler);
container.register(CREATE_BOOK_HANDLER, CreateBookHandler);

// User
container.register(GET_USER_HANDLER, GetUserHandler);
container.register(CREATE_USER_HANDLER, CreateUserHandler);

// Internship

container.register(CREATE_INTERNSHIP_HANDLER, CreateInternshipHandler);

export { container };
