import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({

baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,         
      session: schema.sessions,   
      account: schema.accounts,   
      verification: schema.verifications,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: { 
        type: "string", 
        defaultValue: "customer", 
        input: false 
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        console.log(`\n🪄 MAGIC LINK FOR ${email}:\n${url}\n`);
      },
    }),
  ],
});