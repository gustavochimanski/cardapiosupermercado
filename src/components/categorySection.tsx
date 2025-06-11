import { ProductCard } from "./ProductCard";
import { ProdutoCard } from "@/types/ProdutoCard";

interface CategorySectionProps {
  categoria: string;
  categoriaLabel?: string;
  produtos: ProdutoCard[];
  onAdd?: (produto: ProdutoCard) => void;
}

export function CategorySection({
  categoriaLabel,
  produtos,
  onAdd,
}: CategorySectionProps) {
  if (!produtos || produtos.length === 0) return null; // Não renderiza se não tem produtos

  return (
    <section>
      {categoriaLabel && (
        <h2 className="text-lg font-bold mb-3 px-2">{categoriaLabel}</h2>
      )}
      <div className="flex gap-4 overflow-x-auto snap-x pb-2 hide-scrollbar">
        {produtos.map((produto) => (
          <div key={produto.id} className="snap-start min-w-[150px] max-w-xs">
            <ProductCard {...produto} onAdd={() => onAdd?.(produto)} />
          </div>
        ))}
      </div>
    </section>
  );
}
