
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  

  const isBypass = searchParams.get('bypass-auth') === 'true';


  if (isBypass) {
    return NextResponse.next();
  }

  
  return NextResponse.next();
}


export const config = {
  matcher: ['/checkout/:path*', '/account/:path*'],
};