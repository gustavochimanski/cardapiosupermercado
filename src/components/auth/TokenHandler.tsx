// src/components/auth/TokenHandler.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export function TokenHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("supervisor_token");
    if (token) {
      console.log("🔐 Token recebido via URL:", token);
      Cookies.set("token", token, { path: "/" });
    }
  }, [searchParams]);

  return null;
}
