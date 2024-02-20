import {  ISession } from "@/types";

export const authChecker = (session: ISession | null, roles: string[]) => {
  if (session == null) return false;
  if (session?.user == null) return false;
  if (roles == null || !roles.some((role) => true)) return true;
  return roles.some((role) => role === session!.user!.role);
};
