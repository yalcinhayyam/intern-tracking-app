import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetUserParams } from "@/use-cases";
import { IUser } from "@/models";
import { IInjector, ILogger,Callable } from "@/types";
import { COMPARE_PASSWORD, GET_USER_HANDLER, LOGGER } from "@/constants";
import type { ComparePassword } from "@/utilities";

export const authOptions =
  (injector: IInjector): Callable<AuthOptions, void> =>
  () => ({
    callbacks: {
      redirect: async ({ url, baseUrl }) => {
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
          username: {
            label: "Username",
            type: "text",
            placeholder: "Username",
          },
          email: {
            label: "Email",
            type: "email",
            placeholder: "Email address",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          try {
            if (!credentials) return null;
            const getUser = injector.inject<IUser, GetUserParams>(
              GET_USER_HANDLER
            );

            const result = await getUser({
              email: credentials?.email,
            });

            if (!result.isSuccess) {
              return null;
            }

            const comparePassword =
              injector.service<ReturnType<ComparePassword>>(COMPARE_PASSWORD);
            const user = result.success;

            const match = await comparePassword({
              password: credentials.password,
              hash: user.hash,
            });

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
          } catch (e) {
            injector.service<ILogger>(LOGGER).error(e);
            return null;
          }
        },
      }),
    ],
  });
