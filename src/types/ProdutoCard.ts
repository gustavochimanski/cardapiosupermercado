// src/types/ProdutoCard.ts
export interface ProdutoCard {
  id: string | number;
  name: string;
  image: string;
  price: number;
  description?: string;
}
