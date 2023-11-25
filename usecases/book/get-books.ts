import { Cursor, Projection, query } from "@/core";
import { Right } from "@/utilities";
import type { Failure, AbstractHandler } from "@/core";
import { PrismaClient } from "@prisma/client";
import type { Either } from "effect/Either";
import { PRISMA_CLIENT } from "@/constants";
import { inject, injectable } from "tsyringe";

export interface IBook {
  id: string;
  title: string;
  author: string;
}
export type GetBooksParams = {
  fields: Projection<IBook>;
  first: number;
  after?: Cursor;
};

@injectable()
export class GetBooksHandler
  implements AbstractHandler<IBook[], GetBooksParams>
{
  books = [
    { id: "1", title: "The Awakening", author: "Kate Chopin" },
    { id: "2", title: "City of Glass", author: "Paul Auster" },
  ];
  constructor(@inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}
  async handle(args: GetBooksParams): Promise<Either<Failure, IBook[]>> {
    console.log(
      await this.prisma.book.findMany({
        ...query({ ...args, orderBy: "asc" }),
        where: {},
      })
    );
    return Right(this.books);
  }
}
