import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Next.js latest rule onujayi ekhon function-er naam 'proxy' hote hobe
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes jekhane login chadao jaoa jabe
  const publicRoutes = [
    '/login',
    '/register',
    '/_next',
    '/favicon.ico'
  ];

  // Check jodi route-ti public hoy
  if (publicRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Token check (NextAuth Secret authentication verify korar jonno)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Token na thakle login page-e redirect korbe loop chada
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Config: dynamic matchers validation bypass
export const config = {
  matcher: [
    /*
     * NextAuth-er internal paths block korben na:
     * - api/auth (NextAuth handling endpoints)
     * - _next/static, _next/image, favicon.ico (static files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};