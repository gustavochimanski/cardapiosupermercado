// app/menu/page.tsx
import { Suspense } from "react";
import { TokenHandler } from "@/components/auth/TokenHandler";

export default function MenuPage() {
  return (
    <>
      <Suspense fallback={null}>
        <TokenHandler />
      </Suspense>

      {/* Conteúdo normal da página */}
    </>
  );
}
