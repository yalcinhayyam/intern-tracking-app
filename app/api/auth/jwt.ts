import { getToken } from "next-auth/jwt"
import { NextResponse,NextRequest } from "next/server"

const secret = process.env.SECRET

export default async function GET(req: NextRequest) {
  const token = await getToken({ req, secret })
  NextResponse.json(JSON.stringify(token, null, 2))
}