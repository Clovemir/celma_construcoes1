import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac } from "crypto";

function getSecret() {
  return process.env.ADMIN_SECRET ?? "celma-admin-secret-key";
}

export function verifyToken(token: string): boolean {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;
    const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
    return expected === sig;
  } catch {
    return false;
  }
}

export function createToken(): string {
  const payload = Buffer.from(JSON.stringify({ ts: Date.now() })).toString("base64");
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_session")?.value;
    if (!token || !verifyToken(token)) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
