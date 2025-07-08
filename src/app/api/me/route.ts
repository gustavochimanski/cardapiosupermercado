// app/api/me/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // só roda o mock em dev
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { message: "Not Found" },
      { status: 404 }
    );
  }

  // mock de usuário admin
  return NextResponse.json({
    id: "mock-admin",
    name: "Admin Dev",
    role: "admin",
  });
}
