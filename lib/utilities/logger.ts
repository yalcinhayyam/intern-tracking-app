import { injectable } from "tsyringe";

export interface ILogger {
  log(value: any): void;
  info(value: any): void;
  error(value: any): void;
}

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
