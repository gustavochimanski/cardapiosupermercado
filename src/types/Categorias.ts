import { TypeCadProdDelivery } from "./Produtos";

// src/types/Categoria.ts
export interface CategoriaDelivery {
  id: number;
  label: string;
  imagem: string | null;
  slug: string
  slug_pai: string | null
  href: string;
  destacar_em_slug: string
  produtos?: TypeCadProdDelivery[]; // 👈 aqui!
}