import { Categoria } from "@/types/Categorias";
import { CategoryCard } from "./CategoryCard";

interface CategoryScrollSectionProps {
  categorias: Categoria[];
  titulo?: string;
}

export function CategoryScrollSection({ categorias, titulo }: CategoryScrollSectionProps) {
  if (!categorias || categorias.length === 0) return null; // Nada para exibir? Não renderiza!

  console.log(categorias)
  return (
    <section>
      {titulo && (
        <h2 className="text-lg font-bold mb-3 px-2">{titulo}</h2>
      )}
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {categorias.map((cat) => (
          <div key={cat.id} className="min-w-[140px] max-w-[180px]">
            <CategoryCard
              label={cat.label}
              image={`/${cat.image}` || "/placeholder-categoria.jpg"}
              href={cat.href || ""}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
