import { EMAIL_ALREADY_EXISTS, USER_REPOSITORY, USER_SERVICE } from "@/constants";
import { Left, Right } from "@/utilities";
import type { AbstractHandler, IResult } from "@/types";
import { inject, injectable } from "tsyringe";
// import { hash as createHash, genSalt } from "bcrypt";
import { Roles } from "@/models/enums";
import { IRole } from "@/models";
import type { IUserService } from "@/services";
import type { IUserRepository } from "@/repository";

export type CreateUserParams = {
  email: string;
  name: string;
  surname: string;
  password: string;
  roleId: Roles;
};

export type CreateUserResult = {
  id: string;
  email: string;
  role: IRole;
  name: string;
  surname: string;
};

@injectable()
export class CreateUserHandler
  implements AbstractHandler<CreateUserResult, CreateUserParams>
{
  constructor(
    @inject(USER_SERVICE) private readonly _userService: IUserService,
    @inject(USER_REPOSITORY) private readonly _userRepository: IUserRepository
  ) {}
  async handle(args: CreateUserParams): IResult<CreateUserResult> {
    if (await this._userService.emailExists(args.email)) {
      return Left(EMAIL_ALREADY_EXISTS);
    }
    
    const hash = await this._userService.createHash(args.password);
    const result = await this._userRepository.create({...args, hash: Buffer.from(hash, "utf8")})

    
    return Right(result);
  }
}
