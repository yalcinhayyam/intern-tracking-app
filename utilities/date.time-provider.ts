import { IDateTimeProvider } from "@/types";


export class DateTimeProvider implements IDateTimeProvider {
    get now(): Date {
      return new Date(Date.now());
    }
  }