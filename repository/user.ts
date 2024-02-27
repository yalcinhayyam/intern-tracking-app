import { IRole, IUser } from "@/models";
import { Roles } from "@/models/enums";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";

export interface IUserRepository {
  create(user: CreateUserInput): Promise<CreateUserResult>;
  get(email: string): Promise<IUser | null>;
  exists(email: string): Promise<boolean>;
}
interface CreateUserInput {
  email: string;
  name: string;
  surname: string;
  hash: Buffer;
  roleId: Roles;
}

interface CreateUserResult {
  id: string;
  email: string;
  role: IRole;
  name: string;
  surname: string;
}

@injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(@inject(PrismaClient) private readonly _prisma: PrismaClient) {}
  async exists(email: string): Promise<boolean> {
    return !!(await this._prisma.user.findFirst({
      where: {
        email,
      },
    }));
  }
  async create(user: CreateUserInput): Promise<CreateUserResult> {
    var result = await this._prisma.user.create({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        surname: true,
      },
      data: user,
    });

    return result;
  }
  async get(email: string): Promise<IUser | null> {
    return await this._prisma.user.findFirst({
      where: {
        email,
        isActive: true,
      },
      include: {
        role: true,
      },
    });
  }
}
