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
    </main>
  )
}
