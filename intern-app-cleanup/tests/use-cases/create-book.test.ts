import { CreateBookHandler, CreateBookParams } from "@/lib/use-cases/book/create-book";
import { Book, Prisma } from "@prisma/client";
import { expect, it } from "vitest";
import assert from "assert";
import { v4 } from "uuid";


it("", async () => {
  const createBook = new CreateBookHandler({
    book: {
      create: (args) =>
        Promise.resolve<Book>({
          ...args.data,
          id: v4(),
          authorId: v4(),
        }),
    },
  } /*satisfies*/ as Prisma.DefaultPrismaClient /*as const*/)
  const createBookParams: CreateBookParams = {
    author: "Author Name",
    title: "Book Title",
  };
  const book = await createBook.handle(createBookParams);
  assert(book._tag === "Right");

  expect(book.right).toBe(createBookParams);
});
