import { ProdutoEmpMini } from "./Produtos";

// src/types/Categoria.ts
export type CategoriaComProdutos = {
  id: number;
  slug: string;
  slug_pai: string | null;
  descricao: string;
  imagem: string | null;
  destacar_em_slug: string | null;
  href: string;
  produtos: ProdutoEmpMini[];
};