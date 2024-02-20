import { ICursor, Query, Projection } from "@/types";
import { IInjector } from "@/types";

export const query: Query =
  <T>(injector: IInjector) =>
  ({
    first,
    after,
    orderBy,
    fields,
  }: {
    first: number;
    after?: ICursor;
    orderBy: "asc" | "desc";
    fields: Projection<T>;
  }) => ({
    skip: 1,
    take: first,
    cursor: after ? { id: after.value } : undefined,
    orderBy: { id: orderBy },
    ...fields,
  });
