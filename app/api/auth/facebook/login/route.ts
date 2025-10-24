import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { generateState, getFacebookAuthorizationUrl } from "@/lib/oauth"

export async function GET() {
  const state = generateState()

  ;(await cookies()).set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
  })

  const authUrl = getFacebookAuthorizationUrl(state)

  return NextResponse.redirect(authUrl)
}
