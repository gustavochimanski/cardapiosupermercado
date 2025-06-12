import React from "react";
import { ProductCard } from "./ProductCard";
import type { ProdutoCard } from "@/types/ProdutoCard";

interface Props {
  categoriaLabel?: string;
  produtos: ProdutoCard[];
  onAdd?: (p: ProdutoCard) => void;
}

function CategorySection({ categoriaLabel, produtos, onAdd }: Props) {
  if (produtos.length === 0) return null;
  return (
    <section>
      {categoriaLabel && <h2 className="text-xl font-bold mb-2 px-2">{categoriaLabel}</h2>}
      <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
        {produtos.map((p) => (
          <div key={p.id} className="snap-start min-w-[150px]">
            <ProductCard {...p} onAdd={() => onAdd?.(p)} />
          </div>
        ))}
      </div>
    </section>
  );
}

// Memoizamos pra só re-render quando produtos ou onAdd mudarem
export default React.memo(CategorySection);
