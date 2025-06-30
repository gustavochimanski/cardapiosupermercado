// src/services/categoriaDeliveryService.ts

import { api } from "@/app/api/api";
import { CategoriaDelivery } from "@/types/Categorias";


export async function fetchCategoriasDelivery(): Promise<CategoriaDelivery[]> {
  const { data } = await api.get("/mensura/cardapio/categorias/", {});
  return data;
}
