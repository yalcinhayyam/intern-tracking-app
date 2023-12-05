import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { injector } from "@/lib/di";
import { BookResolver, UserResolver, AuthResolver } from "@/lib/graphql";
import { Context } from "@/lib/utilities";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { Cursor, CursorScalar, authOptions } from "@/lib/utilities";
import { AuthChecker } from "@/lib/graphql/auth-checker";

const schema = await buildSchema({
  resolvers: [BookResolver, UserResolver, AuthResolver],
  authChecker: AuthChecker,
  container: {
    get: (cls) => injector.service(cls),
  },
  scalarsMap: [{ type: Cursor, scalar: CursorScalar }],
});

const server = new ApolloServer<Context>({
  schema,
});
const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req, res) => {
    const session = await getServerSession(authOptions);
    return { req, res, session };
  },
});

export { handler as GET, handler as POST };
