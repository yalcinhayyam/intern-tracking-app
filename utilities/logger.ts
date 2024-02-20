import { ILogger } from "@/types";
import { injectable } from "tsyringe";

@injectable()
export class ConsoleLogger implements ILogger {
  log(value: object): void {
    console.log(value);
  }

  info(value: object): void {
    console.info(value);
  }
  error(value: object): void {
    console.error(value);
  }
}
