// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // opcional, mas mais rápido

export async function GET(req: NextRequest) {
  // 1. Pega o token do cookie
  const token = req.cookies.get("supervisor_token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Não autorizado" },
      { status: 401 }
    );
  }

  // 2. Chama sua API FastAPI
  const apiUrl = "https://mensuraapi.com.br/mensura/auth/me";
  const upstream = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // 3. Se der erro lá, repassa o status/problema
  if (!upstream.ok) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário" },
      { status: upstream.status }
    );
  }

  // 4. Devolve o JSON pra quem chamou
  const payload = await upstream.json();
  return NextResponse.json(payload, { status: 200 });
}
