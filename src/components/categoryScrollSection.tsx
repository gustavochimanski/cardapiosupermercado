"use client";

import React from "react";
import { CategoryCard } from "./CategoryCard";
import type { CategoriaDelivery } from "@/types/Categorias";

/* Componente principal */
interface Props {
  categorias: CategoriaDelivery[];
  titulo?: string;
}

export default function CategoryScrollSection({ categorias, titulo }: Props) {
  if (categorias.length === 0) return null;

  return (
    <section className="mb-4">
      {titulo && <h2 className="text-xl font-bold mb-2 px-2">{titulo}</h2>}

      <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar px-2">
        {categorias.map((cat) => (
          <div key={cat.id} className="min-w-[140px]">
            <CategoryCard
              label={cat.label}
              image={cat.imagem}
              href={cat.slug_pai ? `/categoria/${cat.slug_pai}/${cat.slug}` : `/categoria/${cat.slug}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
