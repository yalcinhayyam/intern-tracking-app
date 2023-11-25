import { GET_BOOKS_HANDLER, PRISMA_CLIENT } from "@/constants";
import { GetBooksHandler } from "@/usecases";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

const prisma = new PrismaClient();

container.registerInstance(PRISMA_CLIENT, prisma);
container.register(GET_BOOKS_HANDLER, GetBooksHandler);

export { container };
