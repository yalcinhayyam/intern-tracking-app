import { CREATE_INTERNSHIP_HANDLER } from "@/lib/constants";
import {
  CreateInternshipParams,
  CreateInternshipResult,
} from "@/lib/use-cases";
import { serverSession } from "@/lib/utilities";
import { AuthorizationPipeline, handler } from "@/lib/utilities/handler";
import { NextRequest, NextResponse } from "next/server";

export const GET = handler<string, { a: 10 }>(
  [AuthorizationPipeline(["ADMIN"])],
  async (req, injector) => {
    // // var result = await req.json();
    const session = await serverSession();
    console.log(session);
    const createInternship = injector.inject<
      CreateInternshipResult,
      CreateInternshipParams
    >(CREATE_INTERNSHIP_HANDLER);

    // createInternship(session?.user);
    return NextResponse.json({ a: 10 });
  }
);
