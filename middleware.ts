import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";

export async function middleware(request: NextRequest) {
   const path = request.nextUrl.pathname;

const { data: session } = await betterFetch<any>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (!session) {
return NextResponse.redirect(new URL("/login ", request.url));

}

// RULE B: The Role Check (Default-Deny Pattern)
  if (path.startsWith("/dashboard") && session.user.role !== "merchant") {
    return NextResponse.redirect(new URL("/account", request.url));
  }
  return NextResponse.next();
}



export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/dashboard/:path*"],
};