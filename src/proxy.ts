import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { verifyTokenEdge } from "@/lib/token-edge";

const STATIC_FILES = new Set([
  "/manifest.webmanifest",
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.ico",
  "/icon.svg",
  "/apple-icon.svg",
]);

// Every locale prefix the store ever served in the URL. The locale now lives in
// a cookie, so any inbound link still carrying a prefix gets it stripped and is
// sent to the same page at its prefix-free path.
const OLD_LOCALE_PREFIXES = [...routing.locales, "ru", "lv"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (STATIC_FILES.has(pathname)) {
    return NextResponse.next();
  }

  for (const old of OLD_LOCALE_PREFIXES) {
    if (pathname === `/${old}` || pathname.startsWith(`/${old}/`)) {
      const url = request.nextUrl.clone();
      const rest = pathname.slice(old.length + 1);
      url.pathname = rest || "/";
      return NextResponse.redirect(url, 308);
    }
  }

  if (pathname.endsWith("/solvetashop.html")) {
    const url = request.nextUrl.clone();
    url.pathname = "/solvetashop.html";
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("session_token")?.value;
    const payload = token ? await verifyTokenEdge(token) : null;

    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|sitemap.xml|robots.txt|images|fonts|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
  ],
};
