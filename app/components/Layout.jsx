// mark as client component
"use client";

// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from "./Navbar";

export default function Layout({children}) {
  // extracting data from usesession as session
  const { data: session } = useSession()

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <div className="bg-blue-900 min-h-screen">
      <div className="flex min-h-screen">
        <Navbar/>
        <div className="bg-white flex-grow my-2 mr-2 rounded-lg p-4">
          {children }
        </div>
      </div>
      </div>
      
    )
  }

  // rendering components for not logged in users
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-2xl mb-2">Not Signed In</p>
        <button className="bg-blue-600 py-2 px-6 rounded-md mb-2" onClick={() => signIn('google')}>Sign in with google</button>
    </div>
  )

}


