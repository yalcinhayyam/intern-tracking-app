import "reflect-metadata"
import Nav from "@/lib/components/Nav";
import ReduxProvider from "@/lib/components/ReduxProvider";
import "./globals.scss";
import { CounterContextProvider } from "@/lib/context/counter";
import Provider from "@/lib/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utilities";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <Provider session={session}>
      <CounterContextProvider>
        <ReduxProvider>
          <html lang="en">
            {/* <html lang="en" className={"dark"}> */}
            <body>
              <Nav />
              {/* {children} */}
              {children}
            </body>
          </html>
        </ReduxProvider>
      </CounterContextProvider>
    </Provider>
  );
}
