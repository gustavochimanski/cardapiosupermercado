"use client";

import { useState } from "react";
import HeaderComponent from "@/components/Header";
import CategoryScrollSection from "@/components/categoryScrollSection";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";

import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";
import { ProdutoEmpMini } from "@/types/Produtos";

export default function HomePage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoEmpMini | null>(null);

  const empresaId = 1;
  const { data: categorias = [] } = useCategoriasDelivery(empresaId);

  function handleAdd(produto: ProdutoEmpMini, quantity: number) {
    alert(`Adicionado: ${produto.produto.descricao} x${quantity}`);
    setProdutoSelecionado(produto);
    setSheetOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />
      <main className="flex-1 p-2">
        <CategoryScrollSection
          categorias={categorias}
          titulo="Categorias"
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
