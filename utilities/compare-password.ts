import { Callable, IInjector } from "@/types";
import bcrypt from "bcrypt";



export type ComparePassword = (
  injector: IInjector
) => Callable<Promise<boolean>, { password: string; hash: Buffer }>;

export const comparePassword =
  (
    injector: IInjector
  ): Callable<Promise<boolean>, { password: string; hash: Buffer }> =>
  async (args): Promise<boolean> => {
    const match = await bcrypt.compare(
      args.password,
      args.hash.toString("utf-8")
    );

    return match
    
  };
