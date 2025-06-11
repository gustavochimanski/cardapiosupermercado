/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { useState } from "react";
import { CategorySection } from "@/components/categorySection";
import FooterComponent from "@/components/Footer";
import HeaderComponent from "@/components/Header";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";
import { CategoryScrollSection } from "@/components/categoryScrollSection";

// Exemplo de dados
const produtosBebidas = [
  { id: 1, name: "Heinken long neck 330ml", image: "/cerveja-heineken330.png", price: 2.99, description: "35% off " },
  { id: 2, name: "Pepsi 2l", image: "/coca", price: 2.79 },
  { id: 3, name: "Pepsi 2l", image: "/coca", price: 2.79 },
  { id: 4, name: "Pepsi 2l", image: "/coca", price: 2.79 },
];
const produtosSnacks = [
  { id: 3, name: "Batata Chips", image: "/coca", price: 4.99 },
  { id: 4, name: "Doritos", image: "/coca", price: 5.49 },
];

const categorias = [
  { id: 1, label: "Bebidas", image: "/cat-bebidas.jpg", href: "/categoria/bebidas" },
  { id: 2, label: "Hortifruti", image: "/cat-hortifruti.jpg", href: "/categoria/hortifruti" },
  { id: 3, label: "Bebidas", image: "/cat-bebidas.jpg", href: "/categoria/bebidas" },
  { id: 4, label: "Hortifruti", image: "/cat-hortifruti.jpg", href: "/categoria/hortifruti" },
  { id: 5, label: "Bebidas", image: "/cat-bebidas.jpg", href: "/categoria/bebidas" },
  { id: 6, label: "Hortifruti", image: "/cat-hortifruti.jpg", href: "/categoria/hortifruti" },
];

export default function Home() {
  const [sheetOpen, setSheetOpen] = useState(false);
  
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  function handleOpenSheet(produto: any) {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  }

  function handleAdd(produto: any, quantity: number) {
    // Adicione lógica de carrinho aqui se quiser!
    alert(`Adicionado: ${produto.name} x${quantity}`);
    setSheetOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />
      <main className="flex-1 p-2">
        <CategoryScrollSection categorias={categorias} titulo="Categorias" />
        <CategorySection
          categoria="bebidas"
          categoriaLabel="Bebidas"
          produtos={produtosBebidas}
          onAdd={handleOpenSheet}
        />
        <CategorySection
          categoria="snacks"
          categoriaLabel="Snacks"
          produtos={produtosSnacks}
          onAdd={handleOpenSheet}
        />
      </main>
      {produtoSelecionado && (
        <SheetAdicionarProduto
          produto={produtoSelecionado}
          isOpen={sheetOpen}
          onAdd={handleAdd}
          onClose={() => setSheetOpen(false)}
        />
      )}
    </div>
  );
}
