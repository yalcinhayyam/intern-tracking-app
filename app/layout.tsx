import { injector } from "@/di";
import type { Metadata } from "next";
import ReduxProvider from "@/components/ReduxProvider";
import "./globals.scss";
import { CounterContextProvider } from "@/context-api/counter";
import { SessionProvider } from "@/components/SessionProvider";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloProvider } from "@/utilities/client";
import { ProviderComposer } from "@/context-api";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import NextUIProvider from "@/components/NextUIProvider";
import { GET_USER_HANDLER, SESSION } from "@/constants";
import { Fail, Session } from "@/types";
import { useErrorHandler, useErrorHandlerCallback } from "@/hooks/useErrorHandler";
import { GetUserHandler, GetUserParams, GetUserResult } from "@/use-cases";
import { Left, Right } from "effect/Either";
const inter = Inter({ subsets: ["latin"] });

function isDevelopment(): boolean {
  return process.env.NODE_ENV !== "production";
}
const __DEV__ = isDevelopment();
if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

export const metadata: Metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const getUser = await useErrorHandler<GetUserResult, GetUserParams>((injector) =>
  //   injector.inject<GetUserResult, GetUserParams>(GET_USER_HANDLER)
  // )

  // const get

  const [session] = await useErrorHandlerCallback((injector) => {
    return injector.service<ReturnType<Session>>(SESSION)();
  })



  return (

    <SessionProvider session={session}>
      <ApolloProvider>
        <ProviderComposer components={[CounterContextProvider]}>
          <ReduxProvider>
            <html lang="en">
              <body className={inter.className}>
                <NextUIProvider>
                  <NavBar />
                  {children}
                  <Footer />
                </NextUIProvider>
              </body>
            </html>
          </ReduxProvider>
        </ProviderComposer>
      </ApolloProvider>
    </SessionProvider>
  );
}
