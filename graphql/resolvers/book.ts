import {
  Arg,
  Field,
  ObjectType,
  Resolver,
  Query,
  Info,
  Int,
} from "type-graphql";
import { Cursor, PageInfo, fieldSelector, paginator ,AbstractHandler, IConnection, IEdge, INode} from "@/core";
import { GetBooksParams, IBook } from "@/usecases";
import { match } from "effect/Either";
import { GET_BOOKS_HANDLER } from "@/constants";
import { inject, injectable } from "tsyringe";

@ObjectType()
export class BookConnection implements IConnection<IBook> {
  @Field((of) => [BookEdge])
  edges!: BookEdge[];
  @Field()
  pageInfo!: PageInfo;
}
@ObjectType()
export class BookNode implements INode<IBook> {
  @Field()
  id!: string;
  @Field()
  title?: string;
  @Field()
  author?: string;
}
@ObjectType()
class BookEdge implements IEdge<IBook> {
  @Field()
  cursor!: Cursor;
  @Field()
  node!: BookNode;
}

@Resolver()
@injectable()
export class BookResolver {
  constructor(
    @inject(GET_BOOKS_HANDLER)
    private readonly getBooks: AbstractHandler<IBook[], GetBooksParams>
  ) {}

  @Query((returns) => BookConnection)
  async books(
    @Info() info: any,
    @Arg("first", (of) => Int) first: number,
    @Arg("after", { nullable: true }) after?: Cursor
  ): Promise<IConnection<IBook>> {
    return match(
      await this.getBooks.handle({
        fields: fieldSelector(info),
        first,
        after,
      }),
      {
        onRight: (value) => paginator<IBook>(value, [first, after]),
        onLeft: () => Promise.resolve(paginator<IBook>([], [first, after])),
      }
    );
  }
}
