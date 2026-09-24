import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export function devOnly(): NextResponse | null {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Panel jest niedostępny." }, { status: 404 });
  }
  return null;
}

export function passwordOk(request: Request): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  const given = request.headers.get("x-admin-password") ?? "";
  if (!expected || !given) return false;
  const a = createHash("sha256").update(expected).digest();
  const b = createHash("sha256").update(given).digest();
  return timingSafeEqual(a, b);
}

export function denied(): NextResponse {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Panel jest niedostępny." },
      { status: 503 },
    );
  }
  return NextResponse.json({ error: "Złe hasło." }, { status: 401 });
}
