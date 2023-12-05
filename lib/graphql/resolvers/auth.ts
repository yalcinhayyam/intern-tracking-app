import { Arg, Resolver, Mutation } from "type-graphql";
import { AbstractHandler } from "@/lib/utilities";
import { CreateUserParams, CreateUserResult } from "@/lib/use-cases";
import { match } from "effect/Exit";
import { CREATE_BOOK_HANDLER, CREATE_USER_HANDLER } from "@/lib/constants";
import { inject, injectable } from "tsyringe";
import {
  CreateUserInput,
  CreateUserPayload,
} from "@/lib/graphql";

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

  @Mutation((returns) => CreateUserPayload, { nullable: true })
  async signUp(
    @Arg("input", (of) => CreateUserInput, { validate: true })
    input: CreateUserInput
  ): Promise<CreateUserPayload | null> {
    return match(await this.createUser.handle(input), {
      onSuccess: (value) => value,
      onFailure: () => null,
    });
  }
}
