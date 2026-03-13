export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  discountTag?: string;
  highlight?: boolean;
  categoryId: number;
  unit: string;
  stock?: "available" | "low" | "out";
};

export type Category = {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
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
  {
    id: 1,
    name: "Estrutura",
    icon: "Building2",
    description: "Cimentos, blocos, areia",
    color: "from-slate-600 to-slate-800",
  },
  {
    id: 2,
    name: "Acabamento",
    icon: "Paintbrush",
    description: "Argamassas, rejuntes, massa",
    color: "from-amber-600 to-amber-800",
  },
  {
    id: 3,
    name: "Hidráulica",
    icon: "Droplets",
    description: "Tubos, conexões, registros",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 4,
    name: "Elétrica",
    icon: "Zap",
    description: "Fios, disjuntores, tomadas",
    color: "from-yellow-500 to-yellow-700",
  },
  {
    id: 5,
    name: "Ferramentas",
    icon: "Wrench",
    description: "Furadeiras, serras, equipamentos",
    color: "from-zinc-600 to-zinc-800",
  },
  {
    id: 6,
    name: "Pisos e Revestimentos",
    icon: "Grid3X3",
    description: "Cerâmicas, porcelanatos",
    color: "from-stone-500 to-stone-700",
  },
  {
    id: 7,
    name: "Tintas",
    icon: "Palette",
    description: "Tintas, primers, solventes",
    color: "from-violet-600 to-violet-800",
  },
];

export const BRANDS: Brand[] = [
  { id: 1, name: "Votoran" },
  { id: 2, name: "Quartzolit" },
  { id: 3, name: "Tigre" },
  { id: 4, name: "Vedacit" },
  { id: 5, name: "3M" },
  { id: 6, name: "Sika" },
  { id: 7, name: "Coral" },
  { id: 8, name: "Prysmian" },
];

export const CITIES: City[] = [
  { id: 1, name: "São Paulo", state: "SP" },
  { id: 2, name: "Guarulhos", state: "SP" },
  { id: 3, name: "Osasco", state: "SP" },
  { id: 4, name: "São Bernardo do Campo", state: "SP" },
  { id: 5, name: "Santo André", state: "SP" },
  { id: 6, name: "Barueri", state: "SP" },
  { id: 7, name: "Mauá", state: "SP" },
  { id: 8, name: "Diadema", state: "SP" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cimento estrutural CP II 50kg",
    brand: "Votoran",
    price: 42.9,
    originalPrice: 52.9,
    discountTag: "-18% hoje",
    highlight: true,
    categoryId: 1,
    unit: "sc 50kg",
    stock: "available",
  },
  {
    id: 2,
    name: "Argamassa colante externa ACIII 20kg",
    brand: "Quartzolit",
    price: 39.9,
    originalPrice: 47.9,
    discountTag: "linha profissional",
    highlight: true,
    categoryId: 2,
    unit: "sc 20kg",
    stock: "available",
  },
  {
    id: 3,
    name: "Tubo PVC soldável 25mm 3m",
    brand: "Tigre",
    price: 24.5,
    categoryId: 3,
    unit: "barra 3m",
    stock: "available",
  },
  {
    id: 4,
    name: "Rejunte flexível cinza 1kg",
    brand: "Quartzolit",
    price: 16.9,
    categoryId: 2,
    unit: "pct 1kg",
    stock: "low",
  },
  {
    id: 5,
    name: "Fita veda rosca 18mm x 50m",
    brand: "Tigre",
    price: 7.5,
    categoryId: 3,
    unit: "rolo",
    stock: "available",
  },
  {
    id: 6,
    name: "Massa corrida acrílica 25kg",
    brand: "Vedacit",
    price: 69.9,
    originalPrice: 82.9,
    discountTag: "estoque limitado",
    categoryId: 7,
    unit: "balde 25kg",
    stock: "low",
  },
  {
    id: 7,
    name: "Parafusadeira/furadeira 12V com bateria",
    brand: "3M",
    price: 329.9,
    categoryId: 5,
    unit: "un",
    stock: "available",
  },
  {
    id: 8,
    name: "Bloco cerâmico 9x19x29cm",
    brand: "Linha estrutural",
    price: 3.2,
    categoryId: 1,
    unit: "un",
    stock: "available",
  },
  {
    id: 9,
    name: "Tinta acrílica branco neve 18L",
    brand: "Coral",
    price: 189.9,
    originalPrice: 220.0,
    categoryId: 7,
    unit: "lata 18L",
    stock: "available",
  },
  {
    id: 10,
    name: "Porcelanato acetinado 60x60cm",
    brand: "Linha estrutural",
    price: 59.9,
    categoryId: 6,
    unit: "m²",
    stock: "available",
  },
  {
    id: 11,
    name: "Cabo flexível 2,5mm² 100m",
    brand: "Prysmian",
    price: 149.9,
    categoryId: 4,
    unit: "rolo 100m",
    stock: "available",
  },
  {
    id: 12,
    name: "Impermeabilizante bicomponente 20kg",
    brand: "Sika",
    price: 119.9,
    originalPrice: 139.9,
    categoryId: 2,
    unit: "balde 20kg",
    stock: "available",
  },
  {
    id: 13,
    name: "Areia média lavada traço",
    brand: "Linha estrutural",
    price: 8.5,
    categoryId: 1,
    unit: "sc 20kg",
    stock: "available",
  },
  {
    id: 14,
    name: "Disjuntor monopolar 20A",
    brand: "3M",
    price: 18.9,
    categoryId: 4,
    unit: "un",
    stock: "available",
  },
  {
    id: 15,
    name: "Cerâmica para piso 45x45cm",
    brand: "Linha estrutural",
    price: 34.9,
    categoryId: 6,
    unit: "m²",
    stock: "low",
  },
  {
    id: 16,
    name: "Nível de bolha 120cm profissional",
    brand: "3M",
    price: 89.9,
    categoryId: 5,
    unit: "un",
    stock: "available",
  },
];
