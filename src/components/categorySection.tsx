import { ProductCard } from "./ProductCard";

interface CategorySectionProps {
  categoria: string;
  categoriaLabel?: string;
  produtos: {
    id: string | number;
    name: string;
    image: string;
    price: number;
    description?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }[];
}

export function CategorySection({ categoriaLabel, produtos }: CategorySectionProps) {
  return (
    <section>
      <h2 className="text-lg font-bold mb-3 px-2">{categoriaLabel}</h2>
      <div className="flex gap-4 overflow-x-auto snap-x pb-2 hide-scrollbar">
        {produtos.map(produto => (
          <div key={produto.id} className="snap-start min-w-[150px] max-w-xs">
            <ProductCard {...produto} />
          </div>
        ))}
      </div>
    </section>

  );
}
