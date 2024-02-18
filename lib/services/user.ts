import { inject, injectable } from "tsyringe";
import { PRISMA_CLIENT } from "../constants";
import { PrismaClient } from "@prisma/client";
import { hash, genSalt } from "bcrypt";

export interface IUserService {
  emailExists(email: string): Promise<boolean>;
  createHash(password: string): Promise<string>;
}

@injectable()
export class UserService implements IUserService {
  constructor(@inject(PRISMA_CLIENT) public readonly prisma: PrismaClient) {}

  async emailExists(email: string): Promise<boolean> {
    return !!(await this.prisma.user.findFirst({
      where: {
        email,
      },
    }));
  }
  createHash = async (password: string): Promise<string> => {
    return await hash(password, await genSalt(10));
  };
}
