import crypto from "crypto"
import * as jose from "jose"

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"

const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize"
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
const GITHUB_USERINFO_URL = "https://api.github.com/user"

const FB_AUTH_URL = "https://www.facebook.com/v22.0/dialog/oauth"
const FB_TOKEN_URL = "https://graph.facebook.com/v22.0/oauth/access_token"
const FB_USERINFO_URL = "https://graph.facebook.com/v22.0/me"

export function generateState(): string {
  return crypto.randomBytes(32).toString("hex")
}

export function getAuthorizationUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    state: state,
    scope: "openid email profile",
  })

  return `${GOOGLE_AUTH_URL}?${params.toString()}`
}

export function getGithubAuthorizationUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.GITHUB_REDIRECT_URI!,
    response_type: "code",
    state: state,
  })

  return `${GITHUB_AUTH_URL}?${params.toString()}`
}

export function getFacebookAuthorizationUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.FB_CLIENT_ID!,
    redirect_uri: process.env.FB_REDIRECT_URI!,
    response_type: "code",
    state: state,
  })

  return `${FB_AUTH_URL}?${params.toString()}`
}

export async function exchangeCodeForToken(code: string) {
  try {
    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Token exchange failed: ${error}`)
    }

    return response.json()
  } catch (error) {
    console.error("Failed to exchange token:", error.message)
    throw error
  }
}

export async function exchangeGithubCodeForToken(code: string) {
  try {
    const response = await fetch(GITHUB_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        redirect_uri: process.env.GITHUB_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Token exchange failed: ${error}`)
    }

    return response.json()
  } catch (error) {
    console.error("Failed to exchange token:", error.message)
    throw error
  }
}

export async function exchangeFacebookCodeForToken(code: string) {
  try {
    const response = await fetch(FB_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        code: code,
        client_id: process.env.FB_CLIENT_ID!,
        client_secret: process.env.FB_CLIENT_SECRET!,
        redirect_uri: process.env.FB_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Token exchange failed: ${error}`)
    }

    return response.json()
  } catch (error) {
    console.error("Failed to exchange token:", error.message)
    throw error
  }
}

export async function getGithubUserInfo(accessToken: string) {
  try {
    const response = await fetch(GITHUB_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) throw new Error("Failed to fetch user info")

    return response.json()
  } catch (error) {
    console.error("Failed to get user info:", error.message)
    throw error
  }
}

export async function getFacebookUserInfo(accessToken: string) {
  try {
    const response = await fetch(FB_USERINFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) throw new Error("Failed to fetch user info")

    return response.json()
  } catch (error) {
    console.error("Failed to get user info:", error.message)
    throw error
  }
}

export async function getUserInfoFromToken(idToken: string) {
  const payload = jose.decodeJwt(idToken)
  const { id, email, name, avatar_url } = payload

  return {
    sub: id,
    email,
    name,
    picture: avatar_url,
  }
}
