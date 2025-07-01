import Image from "next/image";
import { ProdutoEmpMini } from "@/types/Produtos";
import { Button } from "./ui/button";

type Props = {
  produto: ProdutoEmpMini;
  onAdd?: () => void;
};

export function ProductCard({ produto, onAdd }: Props) {
  const { produto: produtoBase, preco_venda } = produto;

  console.log("aaaaaaaaa",produtoBase.imagem)


  return (
    <div className="bg-white rounded shadow p-2 flex flex-col items-center gap-2">
      <Image
        src={produtoBase.imagem || "/placeholder.jpg"}
        alt={produtoBase.descricao || "Produto"}
        width={120}
        height={120}
        className="object-cover rounded"
      />
      <div className="text-sm font-semibold text-center">
        {produtoBase.descricao || "Sem nome"}
      </div>
      <div className="text-sm text-gray-600">
        R$ {Number(preco_venda).toFixed(2)}
      </div>
      <Button
        className="bg-blue-600 text-white px-2 py-1 rounded text-sm mt-1"
        onClick={onAdd}
      >
        Adicionar
      </Button>
    </div>
  );
}
