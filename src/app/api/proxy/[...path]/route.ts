// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  // extrai o token do cookie
  const token = req.cookies.get("supervisor_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  // monta a URL para o FastAPI
  const { pathname, search } = req.nextUrl;
  // `/api/proxy/mensura/auth/me` → strip `/api/proxy` → `/mensura/auth/me`
  const forwardPath = pathname.replace(/^\/api\/proxy/, "");
  const apiUrl = `https://mensuraapi.com.br${forwardPath}${search}`;

  // repassa a requisição, incluindo o header
  const upstream = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await upstream.json().catch(() => ({}));
  return NextResponse.json(body, { status: upstream.status });
}
