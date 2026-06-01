export interface CategoryMock {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ProductMock {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  isFeatured: boolean;
  isAvailable: boolean;
  categoryId: string;
}

export const mockCategories: CategoryMock[] = [
  { id: "cat-1", name: "Espresso & Café", slug: "espresso-cafe", description: "Nossos cafés especiais extraídos com perfeição." },
  { id: "cat-2", name: "Bebidas Geladas", slug: "bebidas-geladas", description: "Opções refrescantes para dias quentes." },
  { id: "cat-3", name: "Chás Especiais", slug: "chas-especiais", description: "Infusões selecionadas para acalmar ou revigorar." },
  { id: "cat-4", name: "Confeitaria & Doces", slug: "confeitaria-doces", description: "Doces artesanais de fabricação própria." },
  { id: "cat-5", name: "Pães & Salgados", slug: "paes-salgados", description: "Salgados assados na hora e pães de fermentação natural." },
];

export const mockProducts: ProductMock[] = [
  { id: "prod-1", name: "Espresso Stoll", slug: "espresso-stoll", description: "Nosso blend exclusivo de grãos selecionados do sul de Minas. Sabor intenso com notas de cacau e avelã.", price: 8.50, imageUrl: "https://images.unsplash.com/photo-1510097252542-a481c2a7e9e2?q=80&w=600&auto=format&fit=crop", isFeatured: true, isAvailable: true, categoryId: "cat-1" },
  { id: "prod-2", name: "Cappuccino Italiano", slug: "cappuccino-italiano", description: "Espresso duplo, leite vaporizado super cremoso e polvilhado com cacau 100% importado.", price: 12.00, imageUrl: "https://images.unsplash.com/photo-1571115177098-24ec4209e548?q=80&w=600&auto=format&fit=crop", isFeatured: true, isAvailable: true, categoryId: "cat-1" },
  { id: "prod-3", name: "Stoll Latte Art", slug: "stoll-latte-art", description: "Espresso curto misturado com leite vaporizado sedoso e finalizado com uma linda arte do barista.", price: 11.50, imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop", isFeatured: false, isAvailable: true, categoryId: "cat-1" },
  { id: "prod-4", name: "Cold Brew Citrus", slug: "cold-brew-citrus", description: "Café extraído a frio por 18h combinado com um toque de limão siciliano, água tônica e muito gelo.", price: 14.90, imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop", isFeatured: true, isAvailable: true, categoryId: "cat-2" },
  { id: "prod-5", name: "Iced Caramel Macchiato", slug: "iced-caramel-macchiato", description: "Espresso gelado com leite fresco, cubos de gelo e finalizado com nossa calda artesanal de caramelo salgado.", price: 15.50, imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop", isFeatured: false, isAvailable: true, categoryId: "cat-2" },
  { id: "prod-6", name: "Matcha Latte", slug: "matcha-latte", description: "Chá verde matcha japonês de grau cerimonial, preparado tradicionalmente e misturado com leite vaporizado.", price: 13.90, imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop", isFeatured: false, isAvailable: true, categoryId: "cat-3" },
  { id: "prod-7", name: "Torta de Nozes Stoll", slug: "torta-nozes-stoll", description: "Massa folhada levíssima recheada com doce de leite artesanal, nozes pecan picadas e ganache meio amargo.", price: 18.00, imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop", isFeatured: true, isAvailable: true, categoryId: "cat-4" },
  { id: "prod-8", name: "Croissant de Amêndoas", slug: "croissant-amendoas", description: "Clássica massa folhada francesa recheada com creme frangipane de amêndoas e polvilhada com açúcar impalpável.", price: 16.50, imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop", isFeatured: false, isAvailable: true, categoryId: "cat-4" },
  { id: "prod-9", name: "Pão de Queijo Canastra", slug: "pao-queijo-canastra", description: "Pão de queijo assado na hora, crocante por fora e puxa por dentro, feito com queijo da Serra da Canastra legítimo.", price: 6.90, imageUrl: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop", isFeatured: true, isAvailable: true, categoryId: "cat-5" },
  { id: "prod-10", name: "Toast de Avocado & Ovo", slug: "toast-avocado-ovo", description: "Pão de fermentação natural grelhado, avocado temperado, ovo poché com gema mole, sementes tostadas e páprica.", price: 22.00, imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop", isFeatured: false, isAvailable: true, categoryId: "cat-5" },
];
