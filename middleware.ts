import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { verifyTokenEdge } from "@/lib/token-edge";

const intlMiddleware = createMiddleware(routing);

const STATIC_FILES = new Set([
  "/manifest.webmanifest",
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.ico",
  "/icon.svg",
  "/apple-icon.svg",
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (STATIC_FILES.has(pathname)) {
    return NextResponse.next();
  }

  // Locales this store used to serve, plus one it never did. Anything still
  // linking to them lands on the English equivalent rather than a dead end.
  const RETIRED_LOCALES = ["ru", "lv"];
  for (const old of RETIRED_LOCALES) {
    if (pathname === `/${old}` || pathname.startsWith(`/${old}/`)) {
      const url = request.nextUrl.clone();
      url.pathname = "/en" + pathname.slice(old.length + 1);
      return NextResponse.redirect(url, 308);
    }
  }

  if (pathname.endsWith("/solvetashop.html")) {
    const url = request.nextUrl.clone();
    url.pathname = "/solvetashop.html";
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    const token = request.cookies.get("session_token")?.value;
    const payload = token ? await verifyTokenEdge(token) : null;

    if (pathname.startsWith("/admin")) {
      if (!payload) {
        return NextResponse.redirect(new URL("/en/auth/login", request.url));
      }
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sitemap.xml|robots.txt|images|fonts|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
