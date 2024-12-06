import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  /*const session = await getToken({ req });
  console.log('Middleware running');

  // If no session (unauthenticated) and the user is trying to access a protected route
  if (!session && req.nextUrl.pathname !== '/login') {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to continue if the user is authenticated or on the login page
  return NextResponse.next();
}

// Optionally add matcher to apply middleware only to specific routes
export const config = {
  matcher: ['/protected', '/dashboard', '/account'], // Specify paths to protect*/
};
