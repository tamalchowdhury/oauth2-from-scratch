import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import {
  exchangeCodeForToken,
  getUserInfo,
  getUserInfoFromToken,
} from "@/lib/oauth"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  const storedState = (await cookies()).get("oauth_state")?.value

  if (!state || !storedState || state !== storedState) {
    return NextResponse.json(
      { error: "Invalid state parameter" },
      { status: 400 }
    )
  }

  if (!code) {
    return NextResponse.json(
      {
        error: "No authorization code received",
      },
      { status: 400 }
    )
  }

  try {
    const tokens = await exchangeCodeForToken(code)
    const userInfo = await getUserInfoFromToken(tokens.id_token)

    ;(await cookies()).set(
      "user_session",
      JSON.stringify({
        user: userInfo,
        accessToken: tokens.access_token,
        expiresAt: Date.now() + tokens.expires_in * 1000,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: tokens.expires_in,
      }
    )
    ;(await cookies()).delete("oauth_state")

    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("OAuth callback error:", error)
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
}
