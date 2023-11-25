import { ICursor } from "@/core";

export class Cursor implements ICursor {
  constructor(public readonly value: string) {}
}
