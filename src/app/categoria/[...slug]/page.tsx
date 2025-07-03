"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import HeaderComponent from "@/components/Header";
import CategoryScrollSection from "@/components/categoryScrollSection";
import CategorySection from "@/components/categorySection";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";

import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";
import type { ProdutoEmpMini } from "@/types/Produtos";
import { Button } from "@/components/ui/button";

export default function CategoriaPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoEmpMini | null>(null);
  const router = useRouter()

  const empresaId = 1;
  const params = useParams<{ slug?: string | string[] }>();
  const slugAtual = Array.isArray(params.slug)
    ? params.slug[params.slug.length - 1]
    : params.slug ?? "";

  const { data: categorias = [], isLoading } = useCategoriasDelivery(empresaId);

  const categoriaAtual = categorias.find((cat) => cat.slug === slugAtual);
  const subcategorias = categorias.filter((cat) => cat.slug_pai === slugAtual);
  const vitrines = categoriaAtual?.vitrines ?? [];

  const produtosDeTodasCategorias = categorias.flatMap((cat) => cat.produtos);

  const blocosVitrine = vitrines.map((vitrine) => {
    const produtosFiltrados = produtosDeTodasCategorias.filter((produto) => {
      const mesmaCategoria = produto.produto.cod_categoria === vitrine.cod_categoria;
      const mesmaSubcategoria = produto.subcategoria_id === vitrine.id;
      return mesmaCategoria && mesmaSubcategoria;
    });
    
    if (produtosFiltrados.length === 0) return null;

    return (
      <CategorySection
        key={vitrine.id}
        categoriaLabel={vitrine.titulo}
        produtos={produtosFiltrados}
        onAdd={handleOpenSheet}
      />
    );
  }).filter(Boolean);

  function handleOpenSheet(produto: ProdutoEmpMini) {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  }

  function handleAdd(produto: ProdutoEmpMini, quantity: number) {
    alert(`Adicionado: ${produto.produto.descricao} x${quantity}`);
    setSheetOpen(false);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg">Carregando categoria e produtos…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />

      <Button onClick={router.back} variant={"link"}>Voltar</Button>
      <main className="flex-1 p-2">

        {subcategorias.length > 0 && (
          <CategoryScrollSection
            categorias={subcategorias}
            titulo={`Subcategorias de ${categoriaAtual?.descricao ?? ""}`}
          />
        )}

        {blocosVitrine}


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
