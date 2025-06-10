"use client";

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// src/types/product.ts
export interface Product {
  name: string;
  image: string;
  price: number;
  description?: string;
}

const schema = z.object({
  quantity: z
    .number({ invalid_type_error: "Quantidade inválida" })
    .int()
    .positive()
    .min(1)
    .max(99),
});

type FormData = z.infer<typeof schema>;

interface SheetAdicionarProdutoProps {
  produto: Product;
  onAdd?: (produto: Product, quantity: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SheetAdicionarProduto({
  produto,
  onAdd,
  isOpen,
  onClose,
}: SheetAdicionarProdutoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 1 },
  });

  const quantity = watch("quantity");

  function increment() {
    if (quantity < 99) setValue("quantity", quantity + 1);
  }

  function decrement() {
    if (quantity > 1) setValue("quantity", quantity - 1);
  }

  function onSubmit(data: FormData) {
    onAdd?.(produto, data.quantity);
    onClose();
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="pb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="flex gap-4 items-center">
              <div className="relative w-20 h-20 shrink-0">
                <Image
                  src={produto.image ?? "/placeholder.png"}
                  alt={produto.name}
                  fill
                  priority
                  className="object-contain rounded-md"
                />
              </div>
              <span className="flex flex-col max-w-[60%]">
                <span className="font-semibold leading-tight">
                  {produto.name}
                </span>
                {produto.description && (
                  <span className="text-muted-foreground text-sm line-clamp-2">
                    {produto.description}
                  </span>
                )}
              </span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex items-center gap-4">
            <Label htmlFor="quantity" className="text-lg">
              Quantidade
            </Label>
            <div className="flex items-center gap-2">
              <Button type="button" size="icon" onClick={decrement}>
                -
              </Button>
              <Input
                type="number"
                id="quantity"
                {...register("quantity", { valueAsNumber: true })}
                className="w-14 text-center"
              />
              <Button type="button" size="icon" onClick={increment}>
                +
              </Button>
            </div>
            {errors.quantity && (
              <p className="text-destructive text-sm">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <SheetFooter>
            <Button type="submit" className="w-full bg-primary text-background">
              Adicionar R$ {(produto.price * quantity).toFixed(2)}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
