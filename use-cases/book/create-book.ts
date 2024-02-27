import {
  BOOK_REPOSITORY,
  CONTENT_LENGTH,
} from "@/constants";
import { Right, Left } from "@/utilities";
import { AbstractHandler, IResult } from "@/types";
import { inject, injectable } from "tsyringe";
import { z } from "zod";
import { type IBookRepository } from "@/repository";



export class CreateBookParams {
  constructor(public readonly title: string, public readonly author: string) {}
}
export type CreateBookResult = {
  id: string;
  title: string;
  authorId: string;
};

@injectable()
export class CreateBookHandler
  implements AbstractHandler<CreateBookResult, CreateBookParams>
{
  constructor(
    @inject(BOOK_REPOSITORY) private readonly _bookRepository: IBookRepository
  ) {}
  async handle(args: CreateBookParams): IResult<CreateBookResult> {
    if (!this._titleLongerThan3Character(args.title)) {
      return Left(CONTENT_LENGTH("Create Book Title", 3));
    }

    console.log(args)
    const result = await this._bookRepository.create({ ...args });
    return Right(await result);
  }

  private _titleLongerThan3Character(title: string) {
    return z.string().min(3).safeParse(title).success;
  }
}
