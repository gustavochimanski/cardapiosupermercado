"use client";

import { useState } from "react";
import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";
import { useProdutosDelivery } from "@/hooks/useProdutosDelivery";
import HeaderComponent from "@/components/Header";
import  CategorySection  from "@/components/categorySection";
import  CategoryScrollSection from "@/components/categoryScrollSection";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";

const COD_EMPRESA = "001";

export default function HomePage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  const { data: categorias, isLoading: categoriasLoading } = useCategoriasDelivery();
  const { data: produtos, isLoading: produtosLoading } = useProdutosDelivery(COD_EMPRESA);

  if (categoriasLoading || produtosLoading) return <div>Carregando...</div>;
  if (!categorias || !produtos) return null;

  const categoriasRaiz = categorias.filter((cat: any) => cat.slug_pai === null);

  const produtosSemCategoria = produtos
    ?.filter((p: any) => p.cod_categoria === null)
    .map((p: any) => ({
      id: p.id,
      name: p.descricao,
      image: p.imagem || "/placeholder.jpg",
      price: p.preco,
      description: "",
    }));

  function handleOpenSheet(produto: any) {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  }

  function handleAdd(produto: any, quantity: number) {
    alert(`Adicionado: ${produto.name} x${quantity}`);
    setSheetOpen(false);
  }

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />
      <main className="flex-1 p-2">
        <CategoryScrollSection
          categorias={categoriasRaiz}
          titulo="Categorias"
        />

        <CategorySection
          key="sem-categoria"
          categoriaLabel="Outros produtos"
          produtos={produtosSemCategoria}
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
