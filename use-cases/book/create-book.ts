import { PRISMA_CLIENT, CONTENT_LENGTH } from "@/constants";
import { Right, Left } from "@/utilities";
import { AbstractHandler, Result } from "@/types";
import type { IPrismaClient } from "@/types";
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
  constructor(@inject(PRISMA_CLIENT) private readonly prisma: IPrismaClient) {}
  async handle(args: CreateBookParams): Result<CreateBookResult> {
    if (!this._titleLongerThan3Character(args.title)) {
      return Left(CONTENT_LENGTH("Create Book Title", 3));
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
