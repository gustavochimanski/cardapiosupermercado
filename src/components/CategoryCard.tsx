// src/components/CategoryCard.tsx

import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  label: string;
  image: string;
  href: string; // URL de navegação
}

export function CategoryCard({ label, image, href }: CategoryCardProps) {
  return (
    <Link href={href} className="block group">
      <div className="rounded-2xl overflow-hidden bg-muted shadow hover:shadow-lg transition p-3 flex flex-col items-center w-full">
        <div className="relative w-20 h-20 mb-2 rounded-full overflow-hidden bg-background flex items-center justify-center">
          <Image
            src={image}
            alt={label}
            fill
            className="object-cover group-hover:scale-105 transition"
            sizes="80px"
          />
        </div>
        <span className="text-center text-sm font-semibold">{label}</span>
      </div>
    </Link>
  );
}
