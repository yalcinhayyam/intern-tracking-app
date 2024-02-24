import { PRISMA_CLIENT, USER_SERVICE } from "@/constants";
import type { IUserService } from "@/services";
import type { AbstractHandler, IPrismaClient, IResult } from "@/types";
import { Right } from "@/utilities";
import { inject, injectable } from "tsyringe";

export type CreateInternshipParams = {};
export type CreateInternshipResult = {
  user: any;
};
@injectable()
export class CreateInternshipHandler
  implements AbstractHandler<CreateInternshipResult, CreateInternshipParams>
{
  constructor(
    @inject(PRISMA_CLIENT) private readonly _prisma: IPrismaClient,
    @inject(USER_SERVICE) private readonly _userService : IUserService
  ) {}

  async handle(args: CreateInternshipParams): IResult<CreateInternshipResult> {
    const user =await this._userService.sessionUser()

    this._prisma.internship.create({
      data : {
        userId: user?.id,
        
      }
    })

    return Right({ user: "" });
  }
}
