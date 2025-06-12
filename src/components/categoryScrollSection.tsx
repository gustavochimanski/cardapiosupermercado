"use client";

import React from "react";
import { CategoryCard } from "./CategoryCard";
import type { CategoriaDelivery } from "@/types/Categorias";

/* ░░░ Configuração central ─ altere aqui quando mudar o domínio da API ░░░ */
const API_BASE = "http://localhost:8000"; // exemplo: "https://api.meusite.com"

/* Helper p/ montar a URL da imagem ------------------------------------ */
function buildImgSrc(raw: string | null | undefined) {
  if (!raw) return "/placeholder-categoria.jpg";          // cobre null/undefined
  if (/^(https?:|data:)/.test(raw)) return raw;           // URL absoluta
  const path = raw.startsWith("/") ? raw : `/${raw}`;     // garante 1 “/”
  return `${API_BASE}${path}`;
}


/* Componente ----------------------------------------------------------- */
interface Props {
  categorias: CategoriaDelivery[];
  titulo?: string;
}

function CategoryScrollSection({ categorias, titulo }: Props) {
  if (categorias.length === 0) return null;

  return (
    <section>
      {titulo && <h2 className="text-xl font-bold mb-2 px-2">{titulo}</h2>}

      <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
        {categorias.map((cat) => (
          <div key={cat.id} className="min-w-[140px]">
            <CategoryCard
              label={cat.label}
              image={buildImgSrc(cat.imagem)}  // ← usa helper
              href={cat.href ?? "#"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(CategoryScrollSection);
