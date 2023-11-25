import "reflect-metadata";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from "type-graphql";
import { Cursor, CursorScalar } from "@/core";
import { container } from "@/di";
import { BookResolver } from "@/graphql";
import { Context } from "@/types";
import { NextRequest } from "next/server";
// // import { gql } from "graphql-tag";

// import { NextRequest, NextResponse } from "next/server";

// const typeDefs = `#graphql
//   type Query {
//     hello: String
//   }

// type Mutation {
//   example(product:ProductInput!) :Product!

// }
//   input ProductInput {
//     title: String!
//     options: [OptionInput!]
//   }

//   input OptionInput {
//     title: String!
//     value: String!
//   }

//   type Product {
//     id: Int!
//     title: String!
//     options: [Option!]
//   }

//   type Option {
//     title: String!
//     value: String!
//   }
// `;

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

// export const GET = async (request: NextRequest) => handler(request);
// export const POST = async (request: NextRequest) => handler(request);


// export async function POST(request: NextRequest) {
//   return handler(request);
// }
