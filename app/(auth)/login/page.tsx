"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function LoginPage() {

  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });


  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsPending(true); 
    
    const { data, error } = await authClient.signIn.magicLink({ 
      email: values.email, 
      callbackURL: "/account" 
    });

    setIsPending(false); 

    if (error) {

      alert(error.message || "Failed to send magic link. Please try again.");
      return;
    }

    alert("Magic link sent! Check your email.");
  }

  return (
<div className="w-full max-w-lg mx-auto mt-20 p-8 border rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
      

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
          
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Sending..." : "Send Magic Link"}
            </Button>

    
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>


            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/account" })}
            >
              Sign in with Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}