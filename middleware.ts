import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session, User } from "better-auth/types";

// The Boss's custom type extension
type UserWithRole = User & { role: "customer" | "merchant" };

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // The perfectly typed fetch call
  const { data: session } = await betterFetch<{ session: Session; user: UserWithRole } | null>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (path.startsWith("/dashboard") && session.user.role !== "merchant") {
    return NextResponse.redirect(new URL("/account", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/dashboard/:path*"],
};