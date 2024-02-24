import { EMAIL_ALREADY_EXISTS, PRISMA_CLIENT, USER_SERVICE } from "@/constants";
import { Left, Right } from "@/utilities";
import type { AbstractHandler, IPrismaClient, IResult } from "@/types";
import { inject, injectable } from "tsyringe";
// import { hash as createHash, genSalt } from "bcrypt";
import { Roles } from "@/models/enums";
import { IRole } from "@/models";
import type { IUserService } from "@/services";

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
    @inject(PRISMA_CLIENT) private readonly _prisma: IPrismaClient,
    @inject(USER_SERVICE) private readonly _userService: IUserService
  ) {}
  async handle(args: CreateUserParams): IResult<CreateUserResult> {
    if (await this._userService.emailExists(args.email)) {
      return Left(EMAIL_ALREADY_EXISTS);
    }
    const hash = await this._userService.createHash(args.password);

    var result = await this._prisma.user.create({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        surname: true,
      },
      data: {
        email: args.email,
        name: args.name,
        roleId: args.roleId,
        surname: args.surname,
        hash: Buffer.from(hash, "utf8"),
      },
    });
    return Right(result);
  }
}
