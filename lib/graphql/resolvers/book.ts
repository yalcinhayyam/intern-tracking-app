import {
  Arg,
  Resolver,
  Query,
  Info,
  Int,
  Mutation,
  Args,
  Ctx,
  InputType,
  Field,
} from "type-graphql";
import {
  Cursor,
  fieldSelector,
  paginator,
  AbstractHandler,
  IConnection,
} from "@/lib/utilities";
import {
  CreateBookParams,
  CreateBookResult,
  GetBooksParams,
  GetBooksResult,
} from "@/lib/use-cases";
import { match } from "effect/Exit";
import { CREATE_BOOK_HANDLER, GET_BOOKS_HANDLER } from "@/lib/constants";
import { inject, injectable } from "tsyringe";
// import type { Context } from "@/lib/utilities";
import {
  BookConnection, CreateBookInput, CreateBookPayload,
} from "@/lib/graphql";
import { Book } from "@/lib/models";
// import { CreateBookInput, CreateBookPayload } from "../types";


@Resolver()
@injectable()
export class BookResolver {
  constructor(
    @inject(GET_BOOKS_HANDLER)
    private readonly getBooks: AbstractHandler<GetBooksResult, GetBooksParams>,
    @inject(CREATE_BOOK_HANDLER)
    private readonly createBook: AbstractHandler<
      CreateBookResult,
      CreateBookParams
    >
  ) {}

  @Query(() => BookConnection)
  async books(
    @Info() info: any,
    @Arg("first", (of) => Int) first: number,
    @Arg("after", { nullable: true }) after?: Cursor
  ): Promise<IConnection<Book.IBook>> {
    return match(
      await this.getBooks.handle({
        fields: fieldSelector(info),
        first,
        after,
      }),
      {
        onSuccess: (value) => paginator<Book.IBook>(value, [first, after]),
        onFailure: () => paginator<Book.IBook>([], [first, after]),
      }
    );
  }

  @Mutation((returns) => CreateBookPayload, { nullable: true })
  async addBook(
    @Arg("input", (of) => CreateBookInput, { validate: true })
    input: CreateBookInput
  ): Promise<CreateBookPayload | null> {
    return match(await this.createBook.handle(input), {
      onSuccess: (value) => value,
      onFailure: () => null,
    });
  }
}
