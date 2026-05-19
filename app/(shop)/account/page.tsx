"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";

export default function AccountPage() {

  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();


  if (isPending) {
    return (
      <div className="w-full max-w-lg mx-auto mt-20 p-8 border rounded-lg shadow-sm space-y-6 text-center">

        <div className="h-8 w-48 bg-muted animate-pulse rounded mx-auto"></div>
        <div className="h-10 w-full bg-muted animate-pulse rounded mt-6"></div>
      </div>
    );
  }


  return (
    <div className="w-full max-w-lg mx-auto mt-20 p-8 border rounded-lg shadow-sm text-center space-y-6">
      <h1 className="text-2xl font-bold">My Account</h1>
      
      <p className="text-muted-foreground">
        Welcome, <span className="font-medium text-foreground">{session?.user?.email}</span>
      </p>

      <Button 
        variant="destructive" 
        className="w-full"
        onClick={async () => {
          await authClient.signOut();
          router.push("/login"); 
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}