import { AbstractHandler, Result, Right } from "@/lib/utilities";
import { injectable } from "tsyringe";

export type CreateInternshipParams = {};
export type CreateInternshipResult = {};
@injectable()
export class CreateInternshipHandler
  implements AbstractHandler<CreateInternshipResult, CreateInternshipParams>
{
  handle(args: CreateInternshipParams): Result<CreateInternshipResult> {
    return Right({});
  }
}
