"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import HeaderComponent from "@/components/Header";
import CategoryScrollSection from "@/components/categoryScrollSection";
import CategorySection from "@/components/categorySection";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";

import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";

import type { CategoriaDelivery } from "@/types/Categorias";
import type { TypeCadProdDelivery } from "@/types/Produtos";

export default function CategoriaPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<TypeCadProdDelivery | null>(null);

  const params = useParams<{ slug?: string | string[] }>();

  const slugAtual = Array.isArray(params.slug)
    ? params.slug[params.slug.length - 1]
    : params.slug ?? "";

  const { data: categorias = [], isLoading } = useCategoriasDelivery();

  const categoriaAtual = categorias.find((cat) => cat.slug === slugAtual);
  const subcategorias = categorias.filter((cat) => cat.slug_pai === slugAtual);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg">Carregando categoria e produtos…</span>
      </div>
    );
  }

  const handleOpenSheet = (produto: TypeCadProdDelivery) => {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  };

  const handleAdd = (produto: TypeCadProdDelivery, quantity: number) => {
    alert(`Adicionado: ${produto.descricao} x${quantity}`);
    setSheetOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />

      <main className="flex-1 p-2">
        {subcategorias.length > 0 && (
          <CategoryScrollSection
            categorias={subcategorias}
            titulo={`Subcategorias de ${categoriaAtual?.label ?? ""}`}
          />
        )}
        
        {categoriaAtual && Array.isArray(categoriaAtual.produtos) && categoriaAtual.produtos.length > 0 && (
          <CategorySection
            categoriaLabel={categoriaAtual.label}
            produtos={categoriaAtual.produtos}
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
