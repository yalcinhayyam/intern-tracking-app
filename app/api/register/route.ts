import { CREATE_USER_HANDLER } from "@/lib/constants";
import { injector } from "@/lib/di";
import { Roles } from "@/lib/models/enums";
import { CreateUserResult, CreateUserParams } from "@/lib/use-cases";
import { match } from "effect/Exit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, surname } = (await req.json()) as {
      name: string;
      surname: string;
      email: string;
      password: string;
    };

    const createUser = injector.inject<CreateUserResult, CreateUserParams>(
      CREATE_USER_HANDLER
    );

    const result = await createUser({
      email,
      password,
      name,
      roleId: Roles.USER,
      surname,
    });
    return match(result, {
      onSuccess(user) {
        return NextResponse.json({
          user: {
            name: user.name,
            email: user.email,
          },
        });
      },
      onFailure(cause) {
        return NextResponse.json(cause, { status: 401 });
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
