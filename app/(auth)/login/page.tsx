"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: "New User", 
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Account created successfully!");

    }
  };

  return (
    <div className="container mx-auto py-20 px-4 flex justify-center">
      <div className="w-full max-w-md border border-slate-800 rounded-lg p-8 bg-black">
        <h1 className="text-3xl font-bold text-white mb-8">Create Account</h1>
        
        <div className="flex flex-col gap-4">
          <input 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full bg-transparent border border-slate-800 rounded-md px-3 py-2 text-white focus:border-slate-600 outline-none"
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full bg-transparent border border-slate-800 rounded-md px-3 py-2 text-white focus:border-slate-600 outline-none"
          />
          <button 
            onClick={handleSignUp} 
            className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-slate-200 transition-colors"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}