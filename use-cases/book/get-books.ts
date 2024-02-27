import { Right } from "@/utilities";
import type {
  AbstractHandler,
  ICursor,
  Query,
  Projection,
  IResult,
} from "@/types";
import { BOOK_REPOSITORY, QUERY } from "@/constants";
import { inject, injectable } from "tsyringe";
import type { IBook } from "@/models";
import { type IBookRepository } from "@/repository";

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
    @inject(BOOK_REPOSITORY) private readonly _bookRepository: IBookRepository,
  ) {}
  async handle(args: GetBooksParams): IResult<GetBooksResult> {
    // console.log(args)
    var books = await this._bookRepository.get(args)
    return Right(books);
  }
}
