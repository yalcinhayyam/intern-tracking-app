import { Field, InputType, ObjectType } from "type-graphql";
import type { IConnection, ICursor, IEdge, INode } from "@/lib/utilities";
import { PageInfo,Cursor } from "@/lib/utilities";
import { Book } from "@/lib/models";
import { Length } from "class-validator";

@InputType()
export class CreateBookInput {
  @Field()
  @Length(3, 255)
  author!: string;
  @Field()
  @Length(3, 255)
  title!: string;
}

@ObjectType()
export class CreateBookPayload{
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
@ObjectType()
class BookNode {
  @Field()
  id!: string;
  @Field()
  title?: string;
  @Field(of=> Author)
  author!: Author;
}

@ObjectType()
class BookEdge implements IEdge<BookNode> {
  @Field(of=> Cursor)
  cursor!: ICursor;
  @Field(of=> BookNode)
  node!: BookNode;
}
@ObjectType()
export class BookConnection implements IConnection<BookEdge> {
  @Field(of=> [BookEdge])
  edges!: BookEdge[];
  @Field(of=> PageInfo)
  pageInfo!: PageInfo;
}



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
}

@ObjectType()
export class CreateUserPayload {
  @Field()
  id!: string;
  @Field()
  email!: string;
  @Field((of)=> Role)
  role!: Role;
  @Field()
  name!: string;
  @Field()
  surname!: string;
}
