import { Success, Cursor, Projection, query } from "@/lib/utilities";
import type { Fail, AbstractHandler, Result } from "@/lib/utilities";
import { PrismaClient } from "@prisma/client";
import { PRISMA_CLIENT } from "@/lib/constants";
import { inject, injectable } from "tsyringe";
import { Exit } from "effect/Exit";
import type { Book } from "@/lib/models";

export type GetBooksParams = {
  fields: Projection<Book.IBook>;
  first: number;
  after?: Cursor;
};

export type GetBooksResult = Book.IBook[];

@injectable()
export class GetBooksHandler
  implements AbstractHandler<GetBooksResult, GetBooksParams>
{
  books = [
    { id: "1", title: "The Awakening", author: "Kate Chopin" },
    { id: "2", title: "City of Glass", author: "Paul Auster" },
  ];
  constructor(@inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}
  async handle(args: GetBooksParams): Result<GetBooksResult> {
    var books = await this.prisma.book.findMany({
      ...query({ ...args, orderBy: "asc" }),
      where: {},
    });
    return Success(books);
  }
}
