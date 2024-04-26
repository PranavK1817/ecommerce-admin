// mark as client component
"use client";
import { useSession } from "next-auth/react";
import Layout from "./components/Layout";
import Image from "next/image";
export default function Home() {
const {data: session} = useSession();

return(
  <Layout>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
        <Image
          src={session?.user?.image}
          fill
          alt=""
          className="object-cover rounded-full"
        />
        </div>
        <p className="text-2xl mb-2">Welcome <span className="font-bold">{session?.user?.name}</span>. Signed In As</p>
        <p className="font-bold mb-4">{session?.user?.email}</p>
        <button className="bg-red-600 py-2 px-6 rounded-md text-white font-bold" onClick={() => signOut()}>Sign out</button>
      </div>
</Layout>
)

}


