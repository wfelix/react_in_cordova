import React from "react";
import {
  ShareIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Bruschetta Pomodoro",
    description: "Pão Santa Mônica, Tomate e Manjericão",
    price: 7.9,
    imageUrl:
      "https://cibus-dev.conecto.com.br/storage/img/plu/500817/500817.jpg", // substitua pela imagem real
    category: "SALGADOS",
  },
  {
    id: 2,
    title: "Chá Diversos Sabores C/15 Saq",
    description: "",
    price: 6.5,
    imageUrl:
      "https://cibus-dev.conecto.com.br/storage/img/plu/58837/58837.jpg", // substitua pela imagem real
    category: "CAFE",
  },
  {
    id: 3,
    title: "Pizza Tradicional Portuguesa",
    description:
      "Queijo Mozzarella, Molho de Tomate, Presunto Cozido sem Gordura, Ovo, Azeitona Preta Fatiada, Cebola e Orégano",
    price: 32.99,
    imageUrl:
      "https://cibus-dev.conecto.com.br/storage/img/plu/group_screen/pizza-salgada.png", // substitua pela imagem real
    category: "PIZZAS",
  },
];

const categories = [
  { id: 1, label: "CAFE" },
  { id: 2, label: "SALGADOS" },
  { id: 3, label: "PIZZAS" },
  // Adicione mais categorias se desejar...
];

declare global {
  interface Window {
    cordova?: any;
  }
  interface Navigator {
    camera: any;
  }
}

const MenuSushi: React.FC = () => {
  // Exemplo de categoria selecionada
  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("CAFE");
  const [searchValue, setSearchValue] = React.useState<string>("");

  // Filtro de itens com base na categoria selecionada e no valor da busca
  const filteredItems = menuItems.filter(
    (item) =>
      item.category === selectedCategory &&
      item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f5f1] flex flex-col">
      {/* Barra Superior */}
      <header className="bg-orange-500 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center flex-col justify-center gap-2  ">
          <img
            src="https://cibus-dev.conecto.com.br/img/logo.png" // substitua pela URL real do seu logo
            alt="Logo"
            className="h-10"
          />
        </div>
      </header>

      {/* Campo de Busca */}
      <div className="bg-white px-4 py-3">
        <div className="relative">
          <ShareIcon className="h-5 w-5 text-gray-100 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar Produto..."
            className="w-full pl-2 pr-3 py-2 rounded-md border border-orange-400 focus:outline-none focus:border-gray-400 text-sm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* Navegação de Categorias */}
      <nav className="bg-white px-4 py-2 flex space-x-4 overflow-x-auto border-b border-gray-200">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.label)}
            className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-semibold 
              ${
                selectedCategory === cat.label
                  ? "bg-[#df9918] text-[#5f432c]"
                  : "text-gray-600 bg-gray-100"
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Caminho/Categoria Selecionada */}
      <div className="px-4 py-3 text-sm text-gray-600">
        <p>{selectedCategory}</p>
      </div>

      {/* Lista de Itens */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto">
        <div className="flex flex-col space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm p-3 flex items-center"
            >
              {/* Imagem do item */}
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 mr-3">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informações do item */}
              <div className="flex-1">
                <h2 className="text-sm font-bold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                <p className="text-base font-semibold text-[#5f432c] mt-2">
                  R$ {item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          {/* Caso não encontre itens */}
          {filteredItems.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Nenhum item encontrado.
            </p>
          )}
        </div>
      </div>
      

      {/* Barra Inferior com Carrinho */}
      <footer className="bg-white fixed bottom-0 w-full px-4 py-3 shadow-inner flex items-center justify-center">
        <button
          className="bg-[#e8dccd] text-[#5f432c] rounded-full flex items-center justify-center 
            px-4 py-2 font-semibold text-sm space-x-2 shadow-md hover:bg-[#dec7ad] transition"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          <span>Carrinho</span>
        </button>
      </footer>
    </div>
  );
};

export default MenuSushi;
