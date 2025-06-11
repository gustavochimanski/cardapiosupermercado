// src/components/CategoryScrollSection.tsx

import { CategoryCard } from "./CategoryCard";

interface CategoryScrollSectionProps {
  categorias: {
    id: string | number;
    label: string;
    image: string;
    href: string;
  }[];
  titulo?: string;
}

export function CategoryScrollSection({ categorias, titulo }: CategoryScrollSectionProps) {
  return (
    <section>
      {titulo && (
        <h2 className="text-lg font-bold mb-3 px-2">{titulo}</h2>
      )}
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {categorias.map(cat => (
          <div key={cat.id} className="w-full">
            <CategoryCard label={cat.label} image={cat.image} href={cat.href} />
          </div>
        ))}
      </div>
    </section>
  );
}

