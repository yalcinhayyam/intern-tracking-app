import "reflect-metadata"

import NextAuth from "next-auth";
import { authOptions } from "@/lib/utilities";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
