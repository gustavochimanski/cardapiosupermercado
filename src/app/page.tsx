import { CategorySection } from "@/components/categorySection";
import FooterComponent from "@/components/Footer";
import HeaderComponent from "@/components/Header";

// Exemplo de dados
const produtosBebidas = [
  { id: 1, name: "Heinken long neck 330ml", image: "/cerveja-heineken330.png", price: 2.99, description: "35% off " },
  { id: 2, name: "Pepsi 2l", image: "/coca", price: 2.79 },
  { id: 3, name: "Pepsi 2l", image: "/coca", price: 2.79 },
  { id: 4, name: "Pepsi 2l", image: "/coca", price: 2.79 },
];
const produtosSnacks = [
  { id: 3, name: "Batata Chips", image: "/coca", price: 4.99 },
  { id: 4, name: "Doritos", image: "/coca", price: 5.49 },
  // ...
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <HeaderComponent />
      <main className="flex-1 p-2">
        <CategorySection categoria="bebidas" categoriaLabel="Bebidas" produtos={produtosBebidas} />
        <CategorySection categoria="snacks" categoriaLabel="Snacks" produtos={produtosSnacks} />
      </main>
      <FooterComponent />
    </div>
  );
}
