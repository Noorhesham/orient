import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "./routes";
import { cookies } from "next/headers";

const localeMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],
  localePrefix: "always",

  // Used when no locale matches
  defaultLocale: "en",
});

export async function middleware(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.pathname;

  // Skip middleware for API routes
  if (path.startsWith("/api")) {
    return NextResponse.next(); // Skip middleware for API routes
  }

  // Access cookies
  const token = req.cookies.get("jwt")?.value;
  const lang = req.cookies.get("NEXT_LOCALE")?.value;

  const url = req.nextUrl.pathname.replace(`/${lang}`, "");

  const isProtectedRoute = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/\[.*\]/, ".*")}$`);
    return regex.test(url);
  });
  const isAuthRoute = authRoutes.includes(url);

  console.log("token", cookies().get("jwt")?.value);
  // Redirect to login if token is missing for protected routes
  if ((!token || token === "undefined") && isProtectedRoute) {
    const redirectPath = req.nextUrl.pathname.replace(`/${lang}`, "");
    req.nextUrl.pathname = `/login`;
    req.nextUrl.searchParams.set("redirect", redirectPath);
    return NextResponse.redirect(req.nextUrl);
  }
  if (token && token !== "undefined" && isAuthRoute) {
    const redirectUrl = req.nextUrl.searchParams.get("redirect");
    if (redirectUrl) {
      req.nextUrl.pathname = redirectUrl;
      req.nextUrl.searchParams.delete("redirect"); // Prevent repeated redirects
      return NextResponse.redirect(req.nextUrl);
    }

    // Handle invalid tokens or login errors
    if (req.nextUrl.searchParams.get("error") === "true") {
      return NextResponse.redirect(req.nextUrl, {
        headers: { "Set-Cookie": "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT" },
      });
    }
    req.nextUrl.pathname = "/";
    return NextResponse.redirect(req.nextUrl);
  }
  // Apply next-intl middleware for locale handling
  return localeMiddleware(req);
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*", "/((?!.*\\..*|_next|api|public).*)"],
};
