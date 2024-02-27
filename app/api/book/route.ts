import { CREATE_BOOK_HANDLER, GET_BOOKS_HANDLER } from "@/constants";
import { IBook } from "@/models";
import {
  CreateBookParams,
  CreateBookResult,
  GetBooksParams,
  GetBooksResult,
} from "@/use-cases";
import { AuthorizationPipeline, handler } from "@/utilities";
import { NextResponse } from "next/server";

export const GET = handler<string, IBook>(
  [AuthorizationPipeline(["ADMIN"])],
  async (req, injector) => {
    const createBook = injector.inject<
      CreateBookResult,
      CreateBookParams
    >(CREATE_BOOK_HANDLER);

   var result = await createBook({author:"Namık Kemal",title:"Test Kitap"});

    return NextResponse.json(result.success);
  }
);

// export const GET = handler<string, IBook[]>(
//   [AuthorizationPipeline(["ADMIN"])],
//   async (req, injector) => {
//     const getBooks = injector.inject<GetBooksResult, GetBooksParams>(
//       GET_BOOKS_HANDLER
//     );

//     const result = await getBooks({
//       fields: {
//         select: {
//           title: true,
//           id: true,
//         },
//       },
//       first: 10,
//     });

//     return NextResponse.json(result.success);
//   }
// );
