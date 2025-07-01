"use client";

import { useState } from "react";
import HeaderComponent from "@/components/Header";
import CategoryScrollSection from "@/components/categoryScrollSection";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";

import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";
import { TypeCadProdDelivery } from "@/types/Produtos";

export default function HomePage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<TypeCadProdDelivery | null>(null);

  const { data: categorias = [] } = useCategoriasDelivery();

  function handleOpenSheet(produto: TypeCadProdDelivery) {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  }

  function handleAdd(produto: TypeCadProdDelivery, quantity: number) {
    alert(`Adicionado: ${produto.descricao} x${quantity}`);
    handleOpenSheet(produto)
    setSheetOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />
      <main className="flex-1 p-2">
        {/* Só renderiza categorias na home */}
        <CategoryScrollSection categorias={categorias} titulo="Categorias" />
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
