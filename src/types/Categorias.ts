// src/types/Categoria.ts
export interface CategoriaDelivery {
  id: number;
  label: string;
  imagem: string | null;
  slug: string
  slug_pai: string | null
  href: string;
}