import { Right } from "@/utilities";
import type {
  AbstractHandler,
  ICursor,
  IQuery,
  Projection,
  Result,
} from "@/types";
import type { IPrismaClient } from "@/types";
import { PRISMA_CLIENT, QUERY } from "@/constants";
import { inject, injectable } from "tsyringe";
import type { IBook } from "@/models";

export type GetBooksParams = {
  fields: Projection<IBook>;
  first: number;
  after?: ICursor;
};

export type GetBooksResult = IBook[];

@injectable()
export class GetBooksHandler
  implements AbstractHandler<GetBooksResult, GetBooksParams>
{
  books = [
    { id: "1", title: "The Awakening", author: "Kate Chopin" },
    { id: "2", title: "City of Glass", author: "Paul Auster" },
  ];
  constructor(
    @inject(PRISMA_CLIENT) private readonly prisma: IPrismaClient,
    @inject(QUERY) private readonly query: IQuery<IBook>
  ) {}
  async handle(args: GetBooksParams): Result<GetBooksResult> {
    // console.log(args)
    var books = await this.prisma.book.findMany({
      ...this.query({ ...args, orderBy: "asc" }),
      where: {},
    });
    return Right(books);
  }
}
