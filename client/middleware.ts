import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authProtectRoutes = [
  "/admin",
  "/classroom",
  "/verifying-payment",
  "/profile",
  "/courses",
  "/cart",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const pathname = request.nextUrl.pathname;

  // check if route is protected
  const isProtected = authProtectRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // if route is protected and no token → redirect
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes (filter inside code)
export const config = {
  matcher: [
    "/admin/:path*",
    "/classroom/:path*",
    "/verifying-payment",
    "/profile",
    "/courses/:path*",
    "/cart",
  ],
};
