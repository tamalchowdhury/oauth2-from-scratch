import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const sessionCookie = (await cookies()).get("user_session")

  if (!sessionCookie) {
    redirect("/")
  }

  const session = JSON.parse(sessionCookie.value)
  const { user } = session

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-full w-24 h-24 mb-4"
          />
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Full User Data:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>

      <a
        href="/api/auth/logout"
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </a>
    </main>
  )
}
