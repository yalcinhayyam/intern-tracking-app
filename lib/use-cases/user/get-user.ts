import { PRISMA_CLIENT, USER_NOT_FOUND } from "@/lib/constants";
import { IUser } from "@/lib/models";
import { AbstractHandler, Left, Result, Right } from "@/lib/utilities";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

export type GetUserParams = {
  email: string;
};

@injectable()
export class GetUserHandler
  implements AbstractHandler<IUser | undefined | null, GetUserParams>
{
  constructor(@inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}
  async handle(args: GetUserParams): Result<IUser | undefined | null> {
    // console.log({args})
    // console.log(await this.prisma.user.findMany())
    var result = await this.prisma.user.findFirst({
      where: {
        email: args.email,
        isActive: true,
      },
      include: {
        role: true,
      },
    });
    if (!result) {
      return Left(USER_NOT_FOUND);
    }

    return Right(result);
  }
}
