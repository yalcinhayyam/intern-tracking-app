import { PRISMA_CLIENT } from "@/constants";
import { AbstractHandler, Failure, IHandler } from "@/core";
import { Left, Right } from "@/utilities";
import { PrismaClient } from "@prisma/client";
import { Either, left, right } from "effect/Either";
import { inject } from "tsyringe";
import { z } from "zod";

export namespace Book {
  export interface CreateBook {
    title: string;
  }

  export interface IBook {
    title: string;
    id: string;
  }
  export class Book implements IBook {
    constructor(public title: string, public id: string) {}
  }
}

export class CreateProductHandler
  implements AbstractHandler<Book.IBook, Book.CreateBook>
{
  constructor(@inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}
  async handle(args: Book.CreateBook): Promise<Either<Failure, Book.IBook>> {
    if (!z.string().min(3).safeParse(args.title).success) {
      return Left({ message: "Title must longer than 3 character" });
    }

    var result = this.prisma.book.create({
      data: {
        authorId: "",
        title: args.title,
      },
    });
    return Right(await result);
  }
}
