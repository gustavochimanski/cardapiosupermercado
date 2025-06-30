"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import HeaderComponent from "@/components/Header";
import CategoryScrollSection from "@/components/categoryScrollSection";
import CategorySection from "@/components/categorySection";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";

import { useCategoriasComProdutos } from "@/hooks/useCategoriasComProdutos";
import type { CategoriaDelivery } from "@/types/Categorias";
import type { TypeCadProdDelivery } from "@/types/Produtos";

export default function CategoriaPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<TypeCadProdDelivery | null>(null);

  // Captura o slug atual da URL
  const params = useParams<{ slug?: string | string[] }>();
  const slugAtual = Array.isArray(params.slug)
    ? params.slug[params.slug.length - 1] // pega o último slug, tipo: ["pizzas", "doces"] → "doces"
    : params.slug ?? "";

  // Hook com categorias e produtos carregados do backend
  const { data: categorias = [], isLoading } = useCategoriasComProdutos();

  // Pega a categoria correspondente ao slug
  const categoriaAtual = categorias.find((cat) => cat.slug === slugAtual);

  // Pega subcategorias (caso existam) com slug_pai igual ao slug atual
  const subcategorias = categorias.filter((cat) => cat.slug_pai === slugAtual);

  // Se ainda estiver carregando os dados
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg">Carregando categoria e produtos…</span>
      </div>
    );
  }

  // Handler para abrir o sheet
  const handleOpenSheet = (produto: TypeCadProdDelivery) => {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  };

  // Handler para adicionar produto (mockado com alert)
  const handleAdd = (produto: TypeCadProdDelivery, quantity: number) => {
    alert(`Adicionado: ${produto.descricao} x${quantity}`);
    setSheetOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />

      <main className="flex-1 p-2">
        {/* Renderiza subcategorias se existirem */}
        {subcategorias.length > 0 && (
          <CategoryScrollSection
            categorias={subcategorias}
            titulo={`Subcategorias de ${categoriaAtual?.descricao ?? ""}`}
          />
        )}

        {/* Renderiza os produtos da categoria atual se existirem */}
        {categoriaAtual?.produtos && categoriaAtual.produtos.length > 0 && (
          <CategorySection
            categoriaLabel={categoriaAtual.descricao}
            produtos={categoriaAtual.produtos}
            onAdd={handleOpenSheet}
          />
        )}
      </main>

      {/* Sheet flutuante para adicionar produto */}
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
