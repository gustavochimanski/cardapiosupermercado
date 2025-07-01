"use client";

import { useState } from "react";
import HeaderComponent from "@/components/Header";
import CategoryScrollSection from "@/components/categoryScrollSection";
import CategorySection from "@/components/categorySection"; // ✅ mostra os produtos
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";

import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";
import { ProdutoEmpMini } from "@/types/Produtos";
import { CategoriaComProdutos } from "@/types/Categorias";

export default function HomePage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoEmpMini | null>(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoriaComProdutos | null>(null);

  const empresaId = 1;
  const { data: categorias = [] } = useCategoriasDelivery(empresaId);

  function handleOpenSheet(produto: ProdutoEmpMini) {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  }

  function handleAdd(produto: ProdutoEmpMini, quantity: number) {
    alert(`Adicionado: ${produto.produto.descricao} x${quantity}`);
    setSheetOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />
      <main className="flex-1 p-2">
        <CategoryScrollSection
          categorias={categorias}
          onCategoriaClick={setCategoriaSelecionada} // ✅ agora está certo
          titulo="Categorias"
        />

        {categoriaSelecionada && (
          <CategorySection
            categoriaLabel={categoriaSelecionada.descricao}
            produtos={categoriaSelecionada.produtos}
            onAdd={handleOpenSheet}
          />
        )}
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
