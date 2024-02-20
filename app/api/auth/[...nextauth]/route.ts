import { AUTH_OPTIONS } from "@/constants";
import { injector } from "@/di";
import { Callable } from "@/types";
import NextAuth, { AuthOptions } from "next-auth";

const route = NextAuth(injector.service<Callable<AuthOptions,void>>(AUTH_OPTIONS)());
export { route as GET, route as POST };
