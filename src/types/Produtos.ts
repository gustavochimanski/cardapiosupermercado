

export type CategoriaMini = {
  slug: string;
  slug_pai?: string | null;
};

// Representa o relacionamento produtos_empresa
export type TypeProdutoEmp = {
  empresa: number;
  cod_barras: string;
  preco_venda: number;
  custo?: number;
  destaque_categoria_1?: string
  destaque_categoria_2?: string
  destaque_categoria_3?: string

};

// Representa o produto principal com o relacionamento
export type TypeCadProdDelivery = {
  id: number;
  cod_barras: string;
  descricao?: string;
  imagem?: string;
  preco_venda: number;
  custo?: number;
  cod_categoria?: number;
  categoria?: CategoriaMini; // <- esta linha é a correção!
  produtos_empresa?: TypeProdutoEmp[]; // caso precise mais pra frente
};


// Para resposta paginada da API
export type TypeCadProdDeliveryResponse = {
  data: TypeCadProdDelivery[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
};


export type TypeCriarNovoProduto = {
  cod_barras: string;
  descricao: string;
  cod_categoria: number;
  imagem?: File | string;
  data_cadastro?: string; // formato ISO: '2025-06-28T12:34:56'
  preco_venda: number;
  custo?: number;
  destaque_categoria_1?: string
  destaque_categoria_2: string
  destaque_categoria_3?: string
};
