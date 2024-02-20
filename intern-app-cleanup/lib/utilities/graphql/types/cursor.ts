import { ICursor } from "@/lib/utilities";

export class Cursor implements ICursor {
  constructor(public readonly value: string) {}
}
