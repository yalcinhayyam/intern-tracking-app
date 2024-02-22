import { CREATE_INTERNSHIP_HANDLER } from "@/constants";
import { CreateInternshipParams, CreateInternshipResult } from "@/use-cases";
import { AuthorizationPipeline, handler } from "@/utilities/handler";
import { NextResponse } from "next/server";

export const GET = handler<string, { a: 10 }>(
  [AuthorizationPipeline(["ADMIN"])],
  async (req, injector) => {
    const createInternship = injector.inject<
      CreateInternshipResult,
      CreateInternshipParams
    >(CREATE_INTERNSHIP_HANDLER);

    await createInternship({});

    return NextResponse.json({ a: 10 });
  });


