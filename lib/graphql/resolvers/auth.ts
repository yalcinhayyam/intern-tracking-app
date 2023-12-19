import { Arg, Resolver, Mutation } from "type-graphql";
import { AbstractHandler } from "@/lib/utilities";
import { CreateUserParams, CreateUserResult } from "@/lib/use-cases";
import { match } from "effect/Either";
import { CREATE_USER_HANDLER } from "@/lib/constants";
import { inject, injectable } from "tsyringe";
import { SignUpInput, SignUpPayload } from "@/lib/graphql";
import { Roles } from "@/lib/models/enums";

@Resolver()
@injectable()
export class AuthResolver {
  constructor(
    @inject(CREATE_USER_HANDLER)
    private readonly createUser: AbstractHandler<
      CreateUserResult,
      CreateUserParams
    >
  ) {}

  @Mutation((returns) => SignUpPayload, { nullable: true })
  async signUp(
    @Arg("input", (of) => SignUpInput, { validate: true })
    input: SignUpInput
  ): Promise<SignUpPayload | null> {
    return match(
      await this.createUser.handle({ ...input, roleId: Roles.USER }),
      {
        onRight: (value) => value,
        onLeft: () => null,
      }
    );
  }
}
