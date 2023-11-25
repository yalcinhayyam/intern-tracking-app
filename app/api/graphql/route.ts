import "reflect-metadata";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from "type-graphql";
import { Cursor, CursorScalar } from "@/core";
import { container } from "@/di";
import { BookResolver } from "@/graphql";
import { Context } from "@/types";
// import { gql } from "graphql-tag";

const typeDefs = `#graphql
  type Query {
    hello: String
  }

type Mutation {
  example(product:ProductInput!) :Product!

}
  input ProductInput {
    title: String!
    options: [OptionInput!]
  }

  input OptionInput {
    title: String!
    value: String!
  }

  type Product {
    id: Int!
    title: String!
    options: [Option!]
  }

  type Option {
    title: String!
    value: String!
  }
`;

const schema = await buildSchema({
  resolvers: [BookResolver],
  container: {
    get: (cls) => container.resolve(cls),
  },
  scalarsMap: [{ type: Cursor, scalar: CursorScalar }],
});

const server = new ApolloServer<Context>({
  schema,
});
const handler = startServerAndCreateNextHandler<NextApiRequest, Context>(
  server,
  {
    context: async (req, res) => {
      return { req, res, user: "Halil" };
    },
  }
);

export { handler as GET, handler as POST };

// export async function GET(request: NextRequest) {
//   return handler(request);
// }

// export async function POST(request: NextRequest) {
//   return handler(request);
// }
