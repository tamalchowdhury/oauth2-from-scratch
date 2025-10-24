import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const sessionCookie = (await cookies()).get("user_session")

  if (sessionCookie) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">OAuth2 From Scratch</h1>
      <p className="text-gray-600 mb-8">
        Learning OAuth2 by building it manually (no libraries)
      </p>

      <a
        href="/api/auth/login"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
      >
        Sign in with Google
      </a>

      <a
        href="/api/auth/facebook/login"
        className="bg-blue-400 hover:bg-blue-600 mt-4 text-white font-bold py-3 px-6 rounded"
      >
        Sign in with Facebook
      </a>

      <a
        href="/api/auth/github/login"
        className="bg-black hover:bg-black-600 mt-4 text-white font-bold py-3 px-6 rounded"
      >
        Sign in with Github
      </a>
    </main>
  )
}
