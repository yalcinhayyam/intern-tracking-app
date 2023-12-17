import { ClassType, Field, InputType, ObjectType, createUnionType } from "type-graphql";
import type {
  IConnection,
  ICursor,
  IEdge,
  INode,
  IPageInfo,
} from "@/lib/utilities";
import { PageInfo, Cursor } from "@/lib/utilities";
import { Length } from "class-validator";
import { Roles } from "../models/enums";
import { registerEnumType } from "type-graphql";

export function Result<TItem extends object>(TItemClass: ClassType<TItem>) {
  @ObjectType()
  abstract class ResultResponseClass {
    @Field((type) => [TItemClass], { nullable: true })
    data?: TItem;
    @Field({ nullable: true })
    error?: string;
  }
  return ResultResponseClass;

}

export function GenerateEdgeType<T extends INode<T>>(TClass: ClassType<T>) {
  @ObjectType()
  abstract class Edge implements IEdge<T> {
    @Field((of) => Cursor)
    cursor!: ICursor;
    @Field((of) => TClass)
    node!: T;
  }

  return Edge;
}

export function Foo<T>(TEdge: ClassType<IEdge<T>>) {
  @ObjectType()
  abstract class Connection implements IConnection<T> {
    @Field((type) => [TEdge])
    edges!: IEdge<T>[];
    @Field((of) => PageInfo)
    pageInfo!: PageInfo;
  }
  return Connection;
}

export function Paginate<T>(TEdge: ClassType<IEdge<T>>) {
  @ObjectType()
  abstract class Connection implements IConnection<T> {
    @Field((type) => [TEdge])
    edges!: IEdge<T>[];
    @Field((of) => PageInfo)
    pageInfo!: PageInfo;
  }
  return Connection;
}

registerEnumType(Roles, {
  name: "Roles", // this one is mandatory
  description: "Role Id Management", // this one is optional
});

@InputType()
export class CreateBookInput {
  @Field()
  // @Length(3, 255)
  author!: string;
  @Field()
  // @Length(3, 255)
  title!: string;
}

@ObjectType()
export class CreateBookPayload {
  @Field()
  id!: string;
  @Field()
  authorId!: string;
  @Field()
  title!: string;
}

@ObjectType()
export class Author {
  @Field()
  id!: string;
  @Field()
  name?: string;
}
// @ObjectType()
// class BookNode {
//   @Field()
//   id!: string;
//   @Field()
//   title?: string;
//   @Field((of) => Author)
//   author!: Author;
// }

// @ObjectType()
// class BookEdge implements IEdge<BookNode> {
//   @Field((of) => Cursor)
//   cursor!: ICursor;
//   @Field((of) => BookNode)
//   node!: BookNode;
// }
// @ObjectType()
// export class BookConnection implements IConnection<BookEdge> {
//   @Field((of) => [BookEdge])
//   edges!: BookEdge[];
//   @Field((of) => PageInfo)
//   pageInfo!: PageInfo;
// }

@ObjectType()
export class Role {
  @Field()
  id!: number;
  @Field()
  code!: string;
  @Field()
  title!: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  // @IsEmail()
  email!: string;
  @Field()
  // @Length(3, 50)
  name!: string;
  @Field()
  // @Length(3, 50)
  surname!: string;
  @Field()
  // @Length(8)
  password!: string;

  @Field((of) => Roles)
  roleId!: Roles;
}

@ObjectType()
export class CreateUserPayload {
  @Field()
  id!: string;
  @Field()
  email!: string;
  @Field((of) => Role)
  role!: Role;
  @Field()
  name!: string;
  @Field()
  surname!: string;
}

@InputType()
export class SignUpInput {
  @Field()
  // @IsEmail()
  email!: string;
  @Field()
  // @Length(3, 50)
  name!: string;
  @Field()
  // @Length(3, 50)
  surname!: string;
  @Field()
  // @Length(8)
  password!: string;
}

@ObjectType()
export class SignUpPayload {
  @Field()
  id!: string;
  @Field()
  email!: string;
  @Field((of) => Role)
  role!: Role;
  @Field()
  name!: string;
  @Field()
  surname!: string;
}

@ObjectType()
export class CreateBookPayloadResult extends Result(CreateBookPayload) {}

@ObjectType()
export class Book implements INode<Book> {
  @Field()
  id!: string;
  @Field()
  title?: string;
  @Field((of) => Author)
  author!: Author;
}

@ObjectType()
export class BookEdge extends GenerateEdgeType(Book) {}
@ObjectType()
export class BookConnection extends Paginate(BookEdge) {}
