// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  // 1. Extrai o token do cookie
  const token = req.cookies.get("supervisor_token")?.value;
  console.log("[proxy] Cookie supervisor_token:", token);

  if (!token) {
    console.log("[proxy] Token ausente – retornando 401");
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  // 2. Monta a URL para o FastAPI
  const { pathname, search } = req.nextUrl;
  const forwardPath = pathname.replace(/^\/api\/proxy/, "");
  const apiUrl = `https://mensuraapi.com.br${forwardPath}${search}`;
  console.log("[proxy] Encaminhando para FastAPI em:", apiUrl);

  // 3. Repassa a requisição, incluindo o header
  let upstream: Response;
  try {
    upstream = await fetch(apiUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error("[proxy] Erro ao chamar FastAPI:", err);
    return NextResponse.json({ message: "Erro de proxy" }, { status: 502 });
  }

  console.log("[proxy] FastAPI respondeu com status:", upstream.status);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // 4. Captura o corpo da resposta
  let body: any = {};
  try {
    body = await upstream.json();
  } catch (err) {
    console.warn("[proxy] Não foi possível ler JSON do body, enviando vazio.", err);
  }

  // 5. Retorna para o cliente
  return NextResponse.json(body, { status: upstream.status });
}
