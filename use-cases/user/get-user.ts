import { PRISMA_CLIENT, USER_NOT_FOUND } from "@/constants";
import { IUser } from "@/models";
import { AbstractHandler, Result } from "@/types";
import { Left, Right } from "@/utilities";
import type { IPrismaClient } from "@/types";
import { inject, injectable } from "tsyringe";

export type GetUserParams = {
  email: string;
};

@injectable()
export class GetUserHandler
  implements AbstractHandler<IUser | undefined | null, GetUserParams>
{
  constructor(@inject(PRISMA_CLIENT) private readonly prisma: IPrismaClient) {}
  async handle(args: GetUserParams): Result<IUser | undefined | null> {
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
