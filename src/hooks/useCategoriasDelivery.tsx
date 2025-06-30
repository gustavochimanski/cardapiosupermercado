// src/hooks/useCategoriasDelivery.ts

import {  fetchCategoriasDelivery } from "@/services/categoriasDeliveryService";
import { CategoriaDelivery } from "@/types/Categorias";
import { useQuery } from "@tanstack/react-query";

export function useCategoriasDelivery() {
  return useQuery<CategoriaDelivery[], Error>({
    queryKey: ["categorias-delivery"],
    queryFn: () => fetchCategoriasDelivery(),
    staleTime: 1000 * 60,
  });
}
