// src/services/categoriaDeliveryService.ts

import { api } from "@/app/api/api";


export interface CategoriaDelivery {
  id: number;
  label: string;
  image: string | null;
  href: string | null;
}

export async function fetchCategoriasDelivery(): Promise<CategoriaDelivery[]> {
  const { data } = await api.get("/categorias/delivery", {});
  return data;
}
