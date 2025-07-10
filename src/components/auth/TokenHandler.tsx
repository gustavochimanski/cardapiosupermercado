// src/components/auth/TokenHandler.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";

export function TokenHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("supervisor_token");
    console.log("🔐 Token recebido via URL:", token);
    if (token) {
      setCookie("token", token, { path: "/" });
    }
  }, [searchParams]);

  return null;
}
