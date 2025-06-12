// src/services/produtoDeliveryService.ts

import { api } from "@/app/api/api";
import { ProdutoDelivery } from "@/types/Produtos";


// Função que busca produtos de delivery por empresa
export async function fetchProdutosDelivery(cod_empresa: string): Promise<ProdutoDelivery[]> {
  const { data } = await api.get("/produtos/delivery", {
    params: { cod_empresa },
  });
  return data;
}
