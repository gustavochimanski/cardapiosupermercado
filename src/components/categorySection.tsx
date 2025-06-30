import React from "react";
import { ProductCard } from "./ProductCard";
import { TypeCadProdDelivery } from "@/types/Produtos";

interface Props {
  categoriaLabel?: string;
  produtos: TypeCadProdDelivery[];
  onAdd?: (p: TypeCadProdDelivery) => void;
}

function CategorySection({ categoriaLabel, produtos, onAdd }: Props) {
  if (produtos.length === 0) return null;

  return (
    <section>
      {categoriaLabel && (
        <h2 className="text-xl font-bold mb-2 px-2">{categoriaLabel}</h2> 
      )}
      <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
        {produtos.map((p) => (
          <div key={p.id} className="snap-start min-w-[150px]">
            <ProductCard produto={p} onAdd={() => onAdd?.(p)} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(CategorySection);
