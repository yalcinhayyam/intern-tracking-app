import { inject, injectable } from "tsyringe";
import { PRISMA_CLIENT } from "../constants";
import { PrismaClient } from "@prisma/client";

export interface IUserService {
  emailExists(email: string): Promise<boolean>;
}

@injectable()
export class UserService implements IUserService{
  constructor(@inject(PRISMA_CLIENT) public readonly prisma: PrismaClient) {}

  async emailExists(email: string): Promise<boolean> {
    return !!(await this.prisma.user.findFirst({
      where: {
        email,
      },
    }));
  }
}
