"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";
import type { ProdutoEmpMini } from "@/types/Produtos";
import { Button } from "@/components/ui/button";
import CategorySection from "@/components/Shared/Category/categorySection";
import HeaderComponent from "@/components/Shared/Header";
import CategoryScrollSection from "@/components/Shared/Category/categoryScrollSection";
import { SheetAdicionarProduto } from "@/components/Shared/Sheet/SheetAddProduto";
import { CircleArrowLeft } from "lucide-react";
import CardAddSecaoSubCateg from "@/components/admin/card/CardAddSecaoSubCateg";

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

      <Button onClick={router.back} variant={"link"} className="mr-auto"> <CircleArrowLeft/>Voltar</Button>
      <main className="flex-1 p-2">
        {categoriaAtual && (
          <CategoryScrollSection
            categorias={subcategorias}
            titulo={categoriaAtual.descricao}
          />
        )}


        {blocosVitrine}
        <CardAddSecaoSubCateg/>
        
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
