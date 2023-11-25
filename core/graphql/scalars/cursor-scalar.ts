import { GraphQLScalarType, Kind } from "graphql";
import { Cursor } from "@/core";

export const CursorScalar = new GraphQLScalarType({
  name: "Cursor",
  description: "Cursor scalar type",
  serialize(type: unknown): string {
    if (!(type instanceof Cursor)) {
      throw new Error("CursorScalar can only serialize Cursor values");
    }
    return type.value; 
  },
  parseValue(value: unknown): Cursor {
   if (typeof value !== "string") {
      throw new Error("CursorScalar can only parse string values");
    }
    return new Cursor(value); 
  },
  parseLiteral(ast): Cursor {

    if (ast.kind !== Kind.STRING) {
      throw new Error("CursorScalar can only parse string values");
    }
    return new Cursor(ast.value); 
  },
});
