import { betterFetch } from '@better-fetch/fetch';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type UserWithRole = { id: string; email: string; role?: string };
type SessionResponse = { user: UserWithRole; session: Record<string, unknown> };

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isProtectedRoute =
		path.startsWith('/checkout') || path.startsWith('/account');
	const isAdminRoute =
		path.startsWith('/admin') || path.startsWith('/dashboard');

	if (!isProtectedRoute && !isAdminRoute) {
		return NextResponse.next();
	}

	const { data } = await betterFetch<SessionResponse>('/api/auth/get-session', {
		baseURL: request.nextUrl.origin,
		headers: { cookie: request.headers.get('cookie') || '' },
	});

	if (!data?.session) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (isAdminRoute && data.user.role !== 'admin') {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
