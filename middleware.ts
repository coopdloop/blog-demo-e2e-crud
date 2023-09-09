import { verifyAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("user-token")?.value;
  const bearerToken = req.headers.get("authorization")?.split(" ")[1];
  const validStaticBearerToken = "coopercodes";
  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));

  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
    return;
  }

  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!verifiedToken) {
    if (req.nextUrl.pathname.startsWith("/api/v1/")) {
      if (bearerToken === validStaticBearerToken) {
        return NextResponse.next();
      }
      return NextResponse.json(
        { error: "You are not authorized. Please get a bearer" },
        { status: 401 }
      );
    } else {
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/api/v1/:path*",
    "/login",
    "/user/:path*",
    "/task/:path*",
  ],
};
