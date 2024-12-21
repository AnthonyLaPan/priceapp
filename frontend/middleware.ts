import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const res = await fetch('http://localhost:3000/api/auth/protected', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': req.headers.get('cookie') || ''
    },
    credentials: 'include'
  });

  if (res.ok) {
    const data = await res.json();
    if (data.authenticated) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect('http://localhost:3001/login');
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|login|register|$).*)',
  ],
};
