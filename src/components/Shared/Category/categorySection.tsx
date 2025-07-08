import React from "react";
import { ProdutoEmpMini } from "@/types/Produtos";
import { ProductCard } from "../ProductCard";

interface Props {
  categoriaLabel?: string;
  produtos: ProdutoEmpMini[];
  onAdd?: (p: ProdutoEmpMini) => void;
}

export default React.memo(function CategorySection({
  categoriaLabel,
  produtos,
  onAdd,
}: Props) {
  if (produtos.length === 0) return null;

  return (
    <section className="mb-6">
      {categoriaLabel && (
        <h2 className="text-xl font-bold mb-2 px-2">{categoriaLabel}</h2>
      )}
      <div className="flex overflow-x-auto items-stretch gap-2 pb-2 hide-scrollbar px-2">
        {produtos.map((p) => (
          <div
            key={p.cod_barras}
            className="snap-start flex flex-col h-full"
          >
            <ProductCard produto={p} onAdd={() => onAdd?.(p)} />
          </div>
        ))}
      </div>
    </section>
  );
});
