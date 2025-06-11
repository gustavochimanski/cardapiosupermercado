"use client";
import { useState } from "react";
import { CategorySection } from "@/components/categorySection";
import HeaderComponent from "@/components/Header";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";
import { CategoryScrollSection } from "@/components/categoryScrollSection";
import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";
import { useProdutosDelivery } from "@/hooks/useProdutosDelivery";

const COD_EMPRESA = "001";

export default function Home() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  const { data: categorias, isLoading: categoriasLoading, isError: categoriasError } =
    useCategoriasDelivery();

  const { data: produtos, isLoading: produtosLoading, isError: produtosError } =
    useProdutosDelivery(COD_EMPRESA);

  function handleOpenSheet(produto: any) {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  }

  function handleAdd(produto: any, quantity: number) {
    alert(`Adicionado: ${produto.name} x${quantity}`);
    setSheetOpen(false);
  }

  if (categoriasLoading || produtosLoading) return <div>Carregando...</div>;
  if (categoriasError || produtosError) return <div>Erro ao carregar dados!</div>;

  const categoriasAdaptadas = categorias?.map((cat: any) => ({
    id: cat.id,
    label: cat.label || cat.nome,
    image: cat.image || cat.imagem || "/placeholder-categoria.jpg",
    href: cat.href || `/categoria/${cat.slug || cat.id}`,
    slug: cat.slug || String(cat.id),
  })) ?? [];

  function produtosDaCategoria(catId: number) {
    return (
      produtos
        ?.filter((p: any) => p.cod_categoria === catId)
        .map((p: any) => ({
          id: p.id,
          name: p.descricao,
          image: p.imagem || "/placeholder.jpg",
          price: p.preco,
          description: "",
        })) || []
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />
      <main className="flex-1 p-2">
        <CategoryScrollSection categorias={categoriasAdaptadas} titulo="Categorias" />
        {categoriasAdaptadas.map((cat) => (
          <CategorySection
            key={cat.id}
            categoria={cat.slug}
            categoriaLabel={cat.label}
            produtos={produtosDaCategoria(cat.id)}
            onAdd={handleOpenSheet}
          />
        ))}
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
