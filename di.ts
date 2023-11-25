import { GET_BOOKS_HANDLER, PRISMA_CLIENT } from "@/constants";
import { GetBooksHandler } from "@/usecases";
import { PrismaClient } from "@prisma/client";
import { container } from "tsyringe";

// class PrismaClientProvider {
//   static client = null;

//   static instance() {
//     if (!this.client) {
//       this.client = new PrismaClient();
//     }
//     return this.client;
//   }
// }

// var client = new PrismaClient();
// await client.$connect()
// container.registerInstance(PRISMA_CLIENT, client);
// container.registerInstance(PRISMA_CLIENT, PrismaClientProvider.instance);
container.registerSingleton(PRISMA_CLIENT, PrismaClient);
container.register(GET_BOOKS_HANDLER, GetBooksHandler);

export { container };
