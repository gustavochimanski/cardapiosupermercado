// src/hooks/useProdutosDelivery.ts

import { fetchProdutosDelivery, ProdutoDelivery } from "@/services/produtosDeliveryService";
import { useQuery } from "@tanstack/react-query";

// Crie um hook personalizado
export function useProdutosDelivery(cod_empresa: string) {
  return useQuery<ProdutoDelivery[], Error>({
    queryKey: ["produtos-delivery", cod_empresa],          // Chave única para cache (cachea por empresa!)
    queryFn: () => fetchProdutosDelivery(cod_empresa),     // Função assíncrona que busca os dados
    staleTime: 1000 * 60, // 1 minuto sem refetch
  });
}
