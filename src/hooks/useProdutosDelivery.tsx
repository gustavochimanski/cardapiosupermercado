
import { api } from "@/app/api/api";
import { TypeCadProdDeliveryResponse } from "@/types/Produtos";
import { useQuery } from "@tanstack/react-query";

export function useProdutosDelivery() {
  return useQuery<TypeCadProdDeliveryResponse>({
    queryKey: ["produtosDelivery"],
    queryFn: async () => {
      const response = await api.get("/mensura/cardapio/");
      return response.data;
    },
  });
}
