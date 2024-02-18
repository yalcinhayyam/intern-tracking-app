import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utilities";

export const serverSession = async () => {
  return await getServerSession(authOptions);
};
