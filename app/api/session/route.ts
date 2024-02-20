import {  SESSION } from "@/constants";
import { injector } from "@/di";
import { Session } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await injector.service<ReturnType<Session>>(SESSION)
  if (!session) {
    return new NextResponse(
      JSON.stringify({ status: "fail", message: "You are not logged in" }),
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
