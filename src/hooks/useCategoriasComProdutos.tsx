// hooks/useCategoriasComProdutos.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/api/api";
import { CategoriaDelivery } from "@/types/Categorias";

export function useCategoriasComProdutos() {
  return useQuery<CategoriaDelivery[]>({
    queryKey: ["categoriasComProdutos"],
    queryFn: async () => {
      const { data } = await api.get("/mensura/cardapio/categorias_com_produtos");
      return data;
    },
  });
}
