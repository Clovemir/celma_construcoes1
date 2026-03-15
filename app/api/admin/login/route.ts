import { NextRequest, NextResponse } from "next/server";
import { createToken } from "@/middleware";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD ?? "celma2024";

    if (password !== adminPassword) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    const token = await createToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
