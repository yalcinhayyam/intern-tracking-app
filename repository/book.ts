import { QUERY } from "@/constants";
import { IBook } from "@/models";
import { PrismaClient } from "@/prisma/prisma";
import { ICursor, Projection, type Query } from "@/types";
import { inject, injectable } from "tsyringe";

type GetBooksParams = {
  fields: Projection<IBook>;
  first: number;
  after?: ICursor;
};

export interface IBookRepository {
  get(args:GetBooksParams): Promise<IBook[]>;
  create(book: CreateBookInput): Promise<CreateBookResult>;
}

type CreateBookInput = {
  title: string;
  author: string;
};
type CreateBookResult = {
  id: string;
  title: string;
  authorId: string;
};

@injectable()
export class PrismaBookRepository implements IBookRepository {
  constructor(
    @inject(PrismaClient) private readonly _prisma: PrismaClient,
    @inject(QUERY) private readonly query: Query<IBook>
  ) {}
  get(args:GetBooksParams): Promise<IBook[]> {
    return this._prisma.book.findMany({
      ...this.query({ ...args, orderBy: "asc" }),
      where: {},
    });
  }
  async create(book: CreateBookInput): Promise<CreateBookResult> {
    return await this._prisma.book.create({
      data: {
        title: book.title,
        author: {
          create: {
            name: book.author,
          },
        },
      },
    });
  }
}
