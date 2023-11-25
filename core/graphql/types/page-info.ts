import { Field, ObjectType } from "type-graphql";
import { IPageInfo } from "@/core";
import { Cursor } from "./cursor";

@ObjectType()
export class PageInfo implements IPageInfo {
  @Field()
  hasNextPage!: boolean;
  @Field()
  hasPreviousPage!: boolean;
  @Field()
  startCursor?: Cursor;
  @Field()
  endCursor?: Cursor;
}
