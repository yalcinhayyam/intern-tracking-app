import { USER_NOT_FOUND, USER_REPOSITORY } from "@/constants";
import { IUser } from "@/models";
import { type IUserRepository } from "@/repository";
import { AbstractHandler, IResult } from "@/types";
import { Left, Right } from "@/utilities";
import { inject, injectable } from "tsyringe";

export type GetUserParams = {
  email: string;
};


export type GetUserResult = IUser | undefined | null

@injectable()
export class GetUserHandler
  implements AbstractHandler<GetUserResult, GetUserParams>
{
  constructor(@inject(USER_REPOSITORY) private readonly _userRepository: IUserRepository) {}
  async handle(args: GetUserParams): IResult<GetUserResult> {
    var result = await this._userRepository.get(args.email)
    if (!result) {
      return Left(USER_NOT_FOUND);
    }

    return Right(result);
  }
}
