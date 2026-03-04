export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  discountTag?: string;
  highlight?: boolean;
};

export type Category = {
  id: number;
  name: string;
};

export type Brand = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
  state: string;
};

export const CATEGORIES: Category[] = [
  { id: 1, name: "Estrutura" },
  { id: 2, name: "Acabamento" },
  { id: 3, name: "Hidráulica" },
  { id: 4, name: "Elétrica" },
  { id: 5, name: "Ferramentas" },
];

export const BRANDS: Brand[] = [
  { id: 1, name: "Votoran" },
  { id: 2, name: "Quartzolit" },
  { id: 3, name: "Tigre" },
  { id: 4, name: "Vedacit" },
  { id: 5, name: "3M" },
];

export const CITIES: City[] = [
  { id: 1, name: "São Paulo", state: "SP" },
  { id: 2, name: "Guarulhos", state: "SP" },
  { id: 3, name: "Osasco", state: "SP" },
  { id: 4, name: "São Bernardo do Campo", state: "SP" },
  { id: 5, name: "Santo André", state: "SP" },
  { id: 6, name: "Barueri", state: "SP" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cimento estrutural CP II 50kg",
    brand: "Votoran",
    price: 42.9,
    originalPrice: 52.9,
    imageUrl:
      "https://images.pexels.com/photos/5854198/pexels-photo-5854198.jpeg",
    discountTag: "-18% hoje",
    highlight: true,
  },
  {
    id: 2,
    name: "Argamassa colante externa ACIII 20kg",
    brand: "Quartzolit",
    price: 39.9,
    originalPrice: 47.9,
    imageUrl:
      "https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg",
    discountTag: "linha profissional",
    highlight: true,
  },
  {
    id: 3,
    name: "Tubo PVC soldável 25mm 3m",
    brand: "Tigre",
    price: 24.5,
    imageUrl:
      "https://images.pexels.com/photos/5854190/pexels-photo-5854190.jpeg",
  },
  {
    id: 4,
    name: "Rejunte flexível cinza 1kg",
    brand: "Quartzolit",
    price: 16.9,
    imageUrl:
      "https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg",
  },
  {
    id: 5,
    name: "Fita veda rosca 18mm x 50m",
    brand: "Tigre",
    price: 7.5,
    imageUrl:
      "https://images.pexels.com/photos/5496461/pexels-photo-5496461.jpeg",
  },
  {
    id: 6,
    name: "Massa corrida acrílica 25kg",
    brand: "Vedacit",
    price: 69.9,
    originalPrice: 82.9,
    imageUrl:
      "https://images.pexels.com/photos/5691590/pexels-photo-5691590.jpeg",
    discountTag: "estoque limitado",
  },
  {
    id: 7,
    name: "Parafusadeira/furadeira 12V com bateria",
    brand: "3M",
    price: 329.9,
    imageUrl:
      "https://images.pexels.com/photos/3825582/pexels-photo-3825582.jpeg",
  },
  {
    id: 8,
    name: "Bloco cerâmico 9x19x29cm",
    brand: "Linha estrutural",
    price: 3.2,
    imageUrl:
      "https://images.pexels.com/photos/4792527/pexels-photo-4792527.jpeg",
  },
];

