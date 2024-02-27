import { inject, injectable } from "tsyringe";
import { SESSION, USER_REPOSITORY } from "@//constants";
import type { Session } from "@/types";
import { hash, genSalt } from "bcrypt";
import { IUser } from "@/models";
import { type IUserRepository } from "@/repository";

export interface IUserService {
  emailExists(email: string): Promise<boolean>;
  createHash(password: string): Promise<string>;
  sessionUser(): Promise<IUser | null>;
}

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(USER_REPOSITORY) public readonly _userRepository: IUserRepository,
    @inject(SESSION) private readonly _session: ReturnType<Session>
  ) {}
  async sessionUser(): Promise<IUser | null> {
    const session = await this._session();
    const user = await this._userRepository.get(session!.user!.email!);

    return user;
  }

  async emailExists(email: string): Promise<boolean> {
    return this._userRepository.exists(email);
  }
  createHash = async (password: string): Promise<string> => {
    return await hash(password, await genSalt(10));
  };
}
