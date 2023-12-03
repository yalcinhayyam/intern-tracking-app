import { AuthCheckerInterface, ResolverData } from "type-graphql";
import { Context } from "@/lib/utilities";

export class AuthChecker implements AuthCheckerInterface<Context> {
  constructor() {}

  check(
    { root, args, context, info }: ResolverData<Context>,
    roles: string[]
  ): boolean {
    return (
      (context.session != null &&
        context.session.user != null &&
        roles.some((role) => true)) ||
      roles.some((role) => role === context.session?.role)
    );
  }
}
