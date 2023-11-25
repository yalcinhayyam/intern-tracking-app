import { Cursor, Projection } from "@/core";

export const query = <T>({
  first,
  after,
  orderBy,
  fields,
}: {
  first: number;
  after?: Cursor;
  orderBy: "asc" | "desc";
  fields: Projection<T>;
}): {
  skip: number;
  take: number;
  cursor?: { id: string };
  orderBy: { id: "asc" | "desc" };
} => ({
  skip: 1,
  take: first,
  cursor: after ? { id: after.value } : undefined,
  orderBy: { id: orderBy },
  ...fields,
});
