import { injector } from "@/lib/di";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { EMAIL_OR_PASSWORD_INCORRECT, GET_USER_HANDLER } from "@/lib/constants";
import { GetUserParams } from "@/lib/use-cases";
import { Callable, EmptyArgs, Failure, Result, Success } from "@/lib/utilities";
import { IUser } from "@/lib/models";
import { isSuccess } from "effect/Exit";

export const authOptions: AuthOptions = {
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      // return Promise.resolve(url);
      return baseUrl;
    },
    async jwt({ token, account, user }: any) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token, user }: any) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  // session : {
  //   strategy: "jwt" 
  // },
  jwt: {
    maxAge: Number(process.env.JWT_MAX_AGE) || 30 * 24 * 60 * 60,
    // decode custom decoder
    // encode custom encoder
  },
  pages: {
    signIn: "/auth/signIn",
    newUser: "/auth/signUp",
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "email", placeholder: "Email address" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const getUser = injector.inject<IUser, GetUserParams>(GET_USER_HANDLER);

        if (!credentials) return null;
        const result = await getUser({
          email: credentials?.email,
        });

        const foundUser = isSuccess(result);
        if (!foundUser) {
          return null;
        }

        const user = result.value;

        const match = isSuccess(
          await comparePassword({
            password: credentials.password,
            hash: user.hash,
          })
        );

        if (!match) {
          return null;
        }
        const authorizedUser = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          roleId: user.roleId,
          role: user.role.code,
        };
        return authorizedUser;
      },
    }),
  ],
};

export default authOptions;

const comparePassword: Callable<
  any,
  { password: string; hash: Buffer }
> = async (args): Result<any> => {
  const match = await bcrypt.compare(
    args.password,
    args.hash.toString("utf-8")
  );
  if (!match) {
    return Failure(EMAIL_OR_PASSWORD_INCORRECT);
  }
  return Success(true, comparePassword.name);
};
