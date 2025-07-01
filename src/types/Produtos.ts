export type ProdutoMini = {
  id: number;
  descricao: string;
  imagem?: string | null;
  cod_categoria?: number;
};

export type ProdutoEmpMini = {
  id: number;
  cod_barras: string;
  preco_venda: number;
  custo?: number;
  destaque_categoria_1?: string;
  destaque_categoria_2?: string;
  destaque_categoria_3?: string;
  produto: ProdutoMini;
};