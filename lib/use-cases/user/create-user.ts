import { EMAIL_ALREADY_EXISTS, PRISMA_CLIENT } from "@/lib/constants";
import { Failure, Success, AbstractHandler, Result } from "@/lib/utilities";
import { PrismaClient, Role } from "@prisma/client";
import { inject } from "tsyringe";
import { hash as createHash, genSalt } from "bcrypt";
import { Roles } from "@/lib/models/enums";
import { IRole } from "@/lib/models";

export type CreateUserParams = {
  email: string;
  name: string;
  surname: string;
  password: string;
};

export type CreateUserResult = {
  id: string;
  email: string;
  role : IRole
  name: string;
  surname: string;
};

export class CreateUserHandler
  implements AbstractHandler<CreateUserResult, CreateUserParams>
{
  constructor(@inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}
  async handle(args: CreateUserParams): Result<CreateUserResult> {
    if (!(await this._emailExists(args.email))) {
      return Failure(EMAIL_ALREADY_EXISTS);
    }
    const hash = await createHash(args.password, await genSalt(10));
    var result = await this.prisma.user.create({
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
        roleId: Roles.USER,
        surname: args.surname,
        hash: Buffer.from(hash, "utf8"),
      },
    });
    return Success(result);
  }
  async _emailExists(email: string): Promise<boolean> {
    return !!(await this.prisma.user.findFirst({
      where: {
        email,
      },
    }));
  }
}
