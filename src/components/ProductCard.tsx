import Image from "next/image";
import { TypeCadProdDelivery } from "@/types/Produtos";

type Props = {
  produto: TypeCadProdDelivery;
  onAdd?: () => void;
};




export function ProductCard({ produto, onAdd }: Props) {

  return (
    <div className="bg-white rounded shadow p-2 flex flex-col items-center gap-2">
      <Image
        src={produto.imagem || ""}
        alt={produto.descricao || "Produto"}
        width={120}
        height={120}
        className="object-cover rounded"
      />
      <div className="text-sm font-semibold text-center">
        {produto.descricao || "Sem nome"}
      </div>
      <div className="text-sm text-gray-600">
        R$ {produto.preco_venda}
      </div>
      <button
        className="bg-blue-600 text-white px-2 py-1 rounded text-sm mt-1"
        onClick={onAdd}
      >
        Adicionar
      </button>
    </div>
  );
}
