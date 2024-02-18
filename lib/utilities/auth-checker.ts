import { Context } from ".";

export const authChecker = (context: Context, roles: string[]) => {
  if (context.session == null) return false;
  if (context.session.user == null) return false;
  if (roles == null || !roles.some((role) => true)) return true;
  return roles.some((role) => role === context.session!.user!.role);
};
