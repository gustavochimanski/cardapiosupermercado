// src/components/CategoryCard.tsx
import Image, { ImageLoaderProps } from "next/image";
import Link from "next/link";

const API_BASE = "http://localhost:8000";          // ⇦ troque por seu domínio prod

function apiLoader({ src }: ImageLoaderProps) {
  // Se já for http/https, devolve como está
  if (/^(https?:|data:)/.test(src)) return src;
  // Caso contrário, concatena com a base (garantindo 1 “/”)
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${API_BASE}${path}`;
}

interface CategoryCardProps {
  label: string;
  image: string | null;
  href: string;
}

export function CategoryCard({ label, image, href }: CategoryCardProps) {
  const src = image ?? "/placeholder-categoria.jpg";

  console.log("AAAA",image)
  return (
    <Link href={href} className="block group">
      <div className="rounded-2xl overflow-hidden bg-muted shadow hover:shadow-lg transition p-3 flex flex-col items-center w-full">
        <div className="relative w-20 h-20 mb-2 rounded-full overflow-hidden bg-background flex items-center justify-center">
          <Image
            loader={apiLoader}      
            src={src}
            alt={label}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition"
          />
        </div>
        <span className="text-center text-sm font-semibold">{label}</span>
      </div>
    </Link>
  );
}
