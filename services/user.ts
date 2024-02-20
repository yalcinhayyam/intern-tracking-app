import { inject, injectable } from "tsyringe";
import { PRISMA_CLIENT, SESSION } from "@//constants";
import type { IPrismaClient, Session } from "@/types";
import { hash, genSalt } from "bcrypt";
import { IUser } from "@/models";

export interface IUserService {
  emailExists(email: string): Promise<boolean>;
  createHash(password: string): Promise<string>;
  sessionUser(): Promise<IUser | null>;
}

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(PRISMA_CLIENT) public readonly _prisma: IPrismaClient,
    @inject(SESSION) private readonly _session: ReturnType<Session>
  ) {}
  async sessionUser(): Promise<IUser | null> {
    const session = await this._session();
    const user = await this._prisma.user.findFirst({
      where: {
        email: session!.user!.email!,
        isActive: true,
      },
      include: {
        role: true,
      },
    });

    return user;
  }

  async emailExists(email: string): Promise<boolean> {
    return !!(await this._prisma.user.findFirst({
      where: {
        email,
      },
    }));
  }
  createHash = async (password: string): Promise<string> => {
    return await hash(password, await genSalt(10));
  };
}
