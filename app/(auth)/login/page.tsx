"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"



export default function LoginPage() {
  const [email, setEmail] = useState("");

  return(
    <>    
    <input type="email" 
    value={email}
    onChange={(e) =>{
      setEmail(e.target.value)
    }}
    />

    <button onClick={() =>  authClient.signIn.magicLink({ email: email, callbackURL: "/account" })}>Send Magic Link</button>
    <button onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/account" })}>Sign in with Google</button>
    </>

  )
}
