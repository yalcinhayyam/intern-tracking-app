// return NextResponse.redirect(new URL('/home', request.url))
// This function can be marked `async` if using `await` inside
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  try {
    // console.log("START");
    return NextResponse.next();
    // console.log("END");
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Something Went Wrong!" });
  }
}

export const config = {
  matcher: ["/api(/.*)?"],
};
/*
Next.js
TypeScript

SOLID

DDD
Clean Architecture
Prisma ORM
DI tsyringe

Value Object
Entity
Aggregate Root
Repository Pattern
Ubiqiute Context

Use Cases

Dependency Injection 
Domain Event
Unit Of Work
Integration Event

https://www.youtube.com/watch?v=_6msA3h2rFQ
CQRS
*/
