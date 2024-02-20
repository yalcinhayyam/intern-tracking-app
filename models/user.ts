export interface IUser {
    id: string;
    email: string;
    name: string;
    surname: string;
    hash: Buffer;
    roleId: number;
    role: {
      id: number;
      title: string;
      code: string;
    };
  }

