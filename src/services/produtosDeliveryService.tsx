// src/services/produtoDeliveryService.ts

import { api } from "@/app/api/api";


// Defina um tipo TypeScript para garantir tipagem dos dados
export interface ProdutoDelivery {
  id: number;
  descricao: string;
  preco: number;
  empresa: string;
  cod_categoria: number;
  imagem: string | null;
}

// Função que busca produtos de delivery por empresa
export async function fetchProdutosDelivery(cod_empresa: string): Promise<ProdutoDelivery[]> {
  const { data } = await api.get("/produtos/delivery", {
    params: { cod_empresa },
  });
  return data;
}
