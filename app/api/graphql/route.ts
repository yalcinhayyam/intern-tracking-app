// import "reflect-metadata";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { buildSchemaSync } from "type-graphql";
import { injector } from "@/lib/di";
import { BookResolver, UserResolver, AuthResolver } from "@/lib/graphql";
import { Context, ILogger } from "@/lib/utilities";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { Cursor, CursorScalar, authOptions } from "@/lib/utilities";
import { AuthChecker } from "@/lib/graphql/auth-checker";
import { CONTEXT, LOGGER } from "@/lib/constants";

const schema = buildSchemaSync({
  resolvers: [BookResolver, UserResolver, AuthResolver],
  authChecker: AuthChecker,
  container: {
    get: (cls) => injector.service(cls),
  },
  scalarsMap: [{ type: Cursor, scalar: CursorScalar }],
});
function isEnableCriticalInformation(): boolean {
  return (
    process.env.NODE_ENV === "development" || process.env.CRITICAL_INFORMATION
  );
}
const server = new ApolloServer<Context>({
  formatError(formattedError, error) {
    const logger = injector.service<ILogger>(LOGGER);
    logger.error(error);

    if (!isEnableCriticalInformation()) {
      return { message: "Something went wrong!" };
    }

    if (error instanceof Error) {
      return { message: error.message };
    }

    return error as any;
  },
  schema,
});
const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req, res) => {
    const session = await getServerSession(authOptions);
    injector.provider<Context>(CONTEXT).changeValue({ session });
    return { req, res, session };
  },
});

export { handler as GET, handler as POST };
