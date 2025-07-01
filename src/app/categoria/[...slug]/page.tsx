"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import HeaderComponent from "@/components/Header";
import CategoryScrollSection from "@/components/categoryScrollSection";
import CategorySection from "@/components/categorySection";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";

import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";
import type { ProdutoEmpMini } from "@/types/Produtos";

export default function CategoriaPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoEmpMini | null>(null);

  const empresaId = 1; // 🔁 Troque isso para vir de login, context ou URL

  // Pega o slug da URL (ex: [...slug])
  const params = useParams<{ slug?: string | string[] }>();
  const slugAtual = Array.isArray(params.slug)
    ? params.slug[params.slug.length - 1]
    : params.slug ?? "";

  // Pega categorias + produtos da API
  const { data: categorias = [], isLoading } = useCategoriasDelivery(empresaId);

  // Identifica a categoria atual pelo slug
  const categoriaAtual = categorias.find((cat) => cat.slug === slugAtual);

  // Filtra as subcategorias da categoria atual
  const subcategorias = categorias.filter((cat) => cat.slug_pai === slugAtual);

  // Carregamento
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg">Carregando categoria e produtos…</span>
      </div>
    );
  }

  // Abre o sheet ao clicar em produto
  const handleOpenSheet = (produto: ProdutoEmpMini) => {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  };

  // Lógica mock de adicionar
  const handleAdd = (produto: ProdutoEmpMini, quantity: number) => {
    alert(`Adicionado: ${produto.produto.descricao} x${quantity}`);
    setSheetOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />

      <main className="flex-1 p-2">
        {/* Subcategorias da categoria atual */}
        {subcategorias.length > 0 && (
          <CategoryScrollSection
            categorias={subcategorias}
            titulo={`Subcategorias de ${categoriaAtual?.descricao ?? ""}`}
          />
        )}

        {/* Produtos da categoria atual */}
        {categoriaAtual?.produtos && categoriaAtual.produtos.length > 0 && (
          <CategorySection
            categoriaLabel={categoriaAtual.descricao}
            produtos={categoriaAtual.produtos}
            onAdd={handleOpenSheet}
          />
        )}
      </main>

      {/* Sheet lateral */}
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
