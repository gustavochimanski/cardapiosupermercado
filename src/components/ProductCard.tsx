import Image from "next/image";
import { ProdutoEmpMini } from "@/types/Produtos";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
} from "@/components/ui/card";

type Props = {
  produto: ProdutoEmpMini;
  onAdd?: () => void;
};

export function ProductCard({ produto, onAdd }: Props) {
  const { produto: produtoBase, preco_venda } = produto;

  return (
    <Card className="w-full max-w-[160px] flex flex-col justify-between overflow-hidden p-0">
      <div className="flex flex-col items-start gap-2 px-3 pt-3 flex-grow">
        {/* 📷 Imagem do produto */}
        <div className="relative w-full aspect-square line-clamp-1">
          <Image
            src={produtoBase.imagem || "/placeholder.jpg"}
            alt={produtoBase.descricao || "Produto"}
            fill
            className="object-cover rounded-md "
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>

        {/* 📝 Nome do produto */}
        <div className="text-sm font-medium text-center h-[40px] leading-5 line-clamp-2">
          {produtoBase.descricao || "Sem nome"}
        </div>

        {/* 💰 Preço */}
        <div className="text-sm text-muted-foreground">
          R$ {Number(preco_venda).toFixed(2)}
        </div>
      </div>

      {/* 🛒 Botão grudado embaixo */}
      <CardFooter className="p-0">
        <Button
          size="sm"
          className="w-full rounded-none text-sm"
          onClick={onAdd}
        >
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
}
