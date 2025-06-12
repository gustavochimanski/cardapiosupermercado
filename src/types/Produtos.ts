export interface ProdutoDelivery {
  id: number;
  descricao: string;
  preco: number;
  empresa: string;
  cod_categoria: number;
  imagem: string | null;
}