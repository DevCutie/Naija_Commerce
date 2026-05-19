"use client"
import { authClient } from "@/lib/auth-client";

export default function Account (){
  const { data: session } = authClient.useSession();

  return(
    <>
    Welcome, {session?.user?.email}

    <button onClick={() => authClient.signOut()}>Sign Out</button>
    </>
  )
}