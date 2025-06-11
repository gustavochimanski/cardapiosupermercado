import { Card,  CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Importa o Badge!
import Image from "next/image";

interface ProductCardProps {
  name: string;
  image: string;
  price: number | string;
  description?: string; // Adiciona a descrição
  onAdd?: () => void;
}



export function ProductCard({ name, image, price, description, onAdd }: ProductCardProps) {
  return (
    <Card className="max-w-xs mx-auto rounded-2xl flex flex-col justify-between group transition h-full p-0 gap-2">
      {/* Imagem do produto */}
      <div onClick={onAdd} className="h-32 w-full relative overflow-hidden rounded-t-2xl bg-muted flex items-center justify-center">
        {image ? (
          <Image
            src={`/${image}`}
            alt={name}
            fill
            className="object-scale-down"
            sizes="(max-width: 640px) 100vw, 400px"
          />
        ) : (
          <span className="text-muted-foreground text-4xl opacity-30">
            {/* ícone padrão */}
            
          </span>
        )}
      </div>

      <CardContent onClick={onAdd} className="flex-1 flex flex-col justify-between px-1 gap-1">
            {/* Título em 1 linha só */}
            <div className="font-semibold text-base line-clamp-1 h-[24px] " title={name}>
            {name}
            </div>

            {/* Badge com descrição */}
            {description && (
                <Badge
                    className="w-fit text-xs max-w-full whitespace-nowrap overflow-hidden text-ellipsis"
                    title={description}
                    variant={"secondary"}
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"> <path d="M6 9l6 6 6-6" /></svg>
                    {description}
                </Badge>
            )}

          <div className="text-primary font-bold text-lg mt-auto">
            {typeof price === "number" ? `R$ ${price.toFixed(2)}` : price}
          </div>
      </CardContent>
      
      <Button
        onClick={() => window.alert("Hello")}
        size="icon"
        className="rounded-xl rounded-t-none bg-accent text-white shadow-md transition w-full"
        variant="default"
        aria-label="Adicionar produto"
        >
        <CirclePlus className="text-primary" size={20} />
      </Button>
    </Card>
  );
}
