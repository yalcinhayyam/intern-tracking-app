import { AuthCheckerInterface, ResolverData } from "type-graphql";
import { Context } from "@/lib/utilities";
import { authChecker } from "../utilities/auth-checker";

export class AuthChecker implements AuthCheckerInterface<Context> {
  constructor() {}

  check = (
    { root, args, context, info }: ResolverData<Context>,
    roles: string[]
  ): boolean => authChecker(context, roles);
}
