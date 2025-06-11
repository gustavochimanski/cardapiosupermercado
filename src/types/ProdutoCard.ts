// src/types/ProdutoCard.ts
export interface ProdutoCard {
  id: string | number;
  name: string;
  image: string;
  price: number;
  description?: string;
  [key: string]: any; // Se quiser permitir extras, mas pode remover pra forçar estrutura rígida
}
