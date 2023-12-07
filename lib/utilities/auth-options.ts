import { injector } from "@/lib/di";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { GET_USER_HANDLER } from "@/lib/constants";
import { GetUserParams } from "@/lib/use-cases";
import { IUser } from "@/lib/models";
import { isSuccess } from "effect/Exit";

export const authOptions: AuthOptions = {
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      // return Promise.resolve(url);
      return baseUrl
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

  pages: {
    signIn: "/auth/signIn",
    newUser: "/auth/signUp",
  },
  secret: process.env.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("🚀 ~ file: auth-options.ts:40 ~ authorize ~ credentials:", credentials)
        // console.log(credentials)
        // if (credentials?.username) {
        //   return await Promise.resolve({
        //     id: "1",
        //     email: "wdwq",
        //     name: "qwd",
        //     role: "ADMIN",
        //   });
        // }
        const getUser = injector.inject<IUser, GetUserParams>(GET_USER_HANDLER);
        try {
          if (!credentials) return null;
          const result = await getUser({
            email: credentials?.username,
          });

          const foundUser = isSuccess(result);

          if (foundUser) {
            const user = result.value;
            // console.log("User Exists");
            const match = await bcrypt.compare(
              credentials.password,
              user.hash.toString("utf-8")
            );

            if (match) {
              const authorizedUser = {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                roleId: user.roleId,
                role: user.role.code,
              };
              return authorizedUser;
            }
          } else {
            console.log(result.cause);
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
};

export default authOptions;
