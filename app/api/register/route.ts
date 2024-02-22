import { CREATE_USER_HANDLER } from "@/constants";
import { Roles } from "@/models/enums";
import { CreateUserResult, CreateUserParams } from "@/use-cases";
import { handler } from "@/utilities";
import { match } from "effect/Either";
import { NextResponse } from "next/server";

export const POST = handler<{
  name: string;
  surname: string;
  email: string;
  password: string;
}, {
  user: {
    name: string,
    email: string,
  },
}>
  ([], async (request, injector) => {

    const { name, email, password, surname } = await request.json()

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
      onRight(user) {
        return NextResponse.json({
          user: {
            name: user.name,
            email: user.email,
          },
        });
      },
      onLeft(cause) {
        return NextResponse.json(cause, { status: 400 });
      },
    });

  })
