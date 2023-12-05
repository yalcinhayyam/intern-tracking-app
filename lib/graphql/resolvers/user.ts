import { Arg, Resolver, Mutation, Authorized } from "type-graphql";
import { AbstractHandler } from "@/lib/utilities";
import { CreateUserParams, CreateUserResult } from "@/lib/use-cases";
import { match } from "effect/Exit";
import { CREATE_USER_HANDLER } from "@/lib/constants";
import { inject, injectable } from "tsyringe";
import { CreateUserInput, CreateUserPayload } from "@/lib/graphql";

@Resolver()
@injectable()
export class UserResolver {
  constructor(
    @inject(CREATE_USER_HANDLER)
    private readonly createUserHandler: AbstractHandler<
      CreateUserResult,
      CreateUserParams
    >
  ) {}
  @Authorized(['ADMIN'])
  @Mutation(() => CreateUserPayload, { nullable: true })
  async createUser(
    @Arg("input", (of) => CreateUserInput) input: CreateUserInput
  ): Promise<CreateUserPayload | null> {
    return match(await this.createUserHandler.handle(input), {
      onSuccess: (value) => value,
      onFailure: () => null,
    });
  }
}
