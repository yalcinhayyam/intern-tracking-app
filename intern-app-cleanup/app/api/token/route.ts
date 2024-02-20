import { getToken } from "next-auth/jwt"
import { NextResponse,NextRequest } from "next/server"

const secret = process.env.SECRET

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret })
  console.log(token)
  return NextResponse.json(token)
}