"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import HeaderComponent from "@/components/Header";
import CategorySection from "@/components/categorySection";
import CategoryScrollSection from "@/components/categoryScrollSection";
import { SheetAdicionarProduto } from "@/components/SheetAddProduto";
import { useCategoriasDelivery } from "@/hooks/useCategoriasDelivery";
import { useProdutosDelivery } from "@/hooks/useProdutosDelivery";
import type { CategoriaDelivery } from "@/types/Categorias";
import type { ProdutoDelivery } from "@/types/Produtos";

const COD_EMPRESA = "001";

// helper corrigido ---------------------------------------------
/* ───────── helper corrigido ───────── */
function normalizeSrc(src?: string | null) {
  if (!src) return "/placeholder.jpg";
  if (/^(https?:|data:)/.test(src)) return src;

  // Opção 1 – regex + segundo argumento
  const path = src.replace(/^\/+/, ""); // remove TODAS as barras no início

  return `/${path}`;
}



export default function CategoriaPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<{ id: number; name: string; image: string; price: number } | null>(
      null,
    );

  /* slug atual --------------------------------------------------------- */
  const params = useParams<{ slug?: string | string[] }>();
  const slugAtual = Array.isArray(params?.slug)
    ? params.slug.join("/")
    : params?.slug ?? "";

  /* dados remotos ------------------------------------------------------ */
  const {
    data: categorias = [],
    isLoading: categoriasLoading,
  } = useCategoriasDelivery();
  const {
    data: produtos = [],
    isLoading: produtosLoading,
  } = useProdutosDelivery(COD_EMPRESA);

  /* categoria e subcategorias ----------------------------------------- */
  const categoriaAtual = categorias.find(
    (cat) => cat.slug === slugAtual,
  ) as CategoriaDelivery | undefined;

  const subcategorias = useMemo(
    () =>
      categorias.filter(
        (cat) => cat.slug_pai === slugAtual,
      ) as CategoriaDelivery[],
    [categorias, slugAtual],
  );

  /* produtos da categoria --------------------------------------------- */
  const produtosCategoriaAtual = useMemo(
    () =>
      categoriaAtual
        ? produtos
            .filter(
              (p: ProdutoDelivery) => p.cod_categoria === categoriaAtual.id,
            )
            .map((p) => ({
              id: p.id,
              name: p.descricao,
              image: normalizeSrc(p.imagem),
              price: p.preco,
              description: "",
            }))
        : [],
    [categoriaAtual, produtos],
  );

  /* handlers ----------------------------------------------------------- */
  const handleOpenSheet = (produto: any) => {
    setProdutoSelecionado(produto);
    setSheetOpen(true);
  };

  const handleAdd = (produto: any, quantity: number) => {
    alert(`Adicionado: ${produto.name} x${quantity}`);
    setSheetOpen(false);
  };

  /* render ------------------------------------------------------------- */
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />

      <main className="flex-1 p-2">
        {(categoriasLoading || produtosLoading) && (
          <div className="p-4 text-center">Carregando…</div>
        )}

        {!categoriasLoading && subcategorias.length > 0 && (
          <CategoryScrollSection
            categorias={subcategorias}
            titulo={
              categoriaAtual
                ? `Subcategorias de ${categoriaAtual.label}`
                : "Subcategorias"
            }
          />
        )}

        {!produtosLoading &&
          categoriaAtual &&
          produtosCategoriaAtual.length > 0 && (
            <CategorySection
              key={categoriaAtual.id}
              categoriaLabel={categoriaAtual.label}
              produtos={produtosCategoriaAtual}
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
