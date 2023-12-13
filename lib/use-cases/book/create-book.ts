import {
  PRISMA_CLIENT,
  CONTENT_LENGTH,
} from "@/lib/constants";
import {
  AbstractHandler,
  Right,
  Left,
  Result,
} from "@/lib/utilities";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { z } from "zod";

export type CreateBookParams = {
  title: string;
  author: string;
};
export type CreateBookResult = {
  id: string;
  title: string;
  authorId: string;
};

@injectable()
export class CreateBookHandler
  implements AbstractHandler<CreateBookResult, CreateBookParams>
{
  constructor(@inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}
  async handle(args: CreateBookParams): Result<CreateBookResult> {
    if (!this._titleLongerThan3Character(args.title)) {
      return Left(
        CONTENT_LENGTH("Create Book Title", 3)
      );
    }

    var result = this.prisma.book.create({
      data: {
        title: args.title,
        author: {
          create: {
            name: args.author,
          },
        },
      },
    });
    return Right(await result);
  }

  private _titleLongerThan3Character(title: string) {
    return z.string().min(3).safeParse(title).success;
  }
}

interface IEntity {}

function EntityTypeGenerator() {
  return class implements IEntity {};
}

class Book extends EntityTypeGenerator() {}
