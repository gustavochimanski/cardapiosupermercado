// src/hooks/useCategoriasDelivery.ts

import { CategoriaDelivery, fetchCategoriasDelivery } from "@/services/categoriasDeliveryService";
import { useQuery } from "@tanstack/react-query";

export function useCategoriasDelivery() {
  return useQuery<CategoriaDelivery[], Error>({
    queryKey: ["categorias-delivery"],
    queryFn: () => fetchCategoriasDelivery(),
    staleTime: 1000 * 60,
  });
}
