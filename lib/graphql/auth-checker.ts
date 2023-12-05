import { AuthCheckerInterface, ResolverData } from "type-graphql";
import { Context } from "@/lib/utilities";

export class AuthChecker implements AuthCheckerInterface<Context> {
  constructor() {}

  check(
    { root, args, context, info }: ResolverData<Context>,
    roles: string[]
  ): boolean {
    console.log(context.session,roles);
    if (context.session == null) return false;
    if (context.session.user == null) return false;
    if (roles == null || !roles.some((role) => true)) return true;
    return roles.some((role) => role === context.session!.user!.role);
  }
}
