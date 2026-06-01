-- ============================================================
-- PASSO 1: Criar tipos (enums)
-- ============================================================
DO $$ BEGIN
  CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CUSTOMER');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PREPARING', 'READY', 'COMPLETED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- PASSO 2: Criar tabelas
-- ============================================================

CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "supabaseUid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Reservation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "guestsCount" INTEGER NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Newsletter" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- ============================================================
-- PASSO 3: Índices únicos
-- ============================================================

CREATE UNIQUE INDEX IF NOT EXISTS "User_supabaseUid_key" ON "User"("supabaseUid");
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "Category_slug_key" ON "Category"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Product_name_key" ON "Product"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "Product_slug_key" ON "Product"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Newsletter_email_key" ON "Newsletter"("email");

-- ============================================================
-- PASSO 4: Chaves estrangeiras (FK)
-- ============================================================

DO $$ BEGIN
  ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey"
    FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey"
    FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey"
    FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- PASSO 5: Dados iniciais (Seed)
-- ============================================================

INSERT INTO "Category" ("id", "name", "slug", "description", "createdAt", "updatedAt") VALUES
('cat-1', 'Espresso & Café',     'espresso-cafe',     'Nossos cafés especiais extraídos com perfeição.',          now(), now()),
('cat-2', 'Bebidas Geladas',     'bebidas-geladas',   'Opções refrescantes para dias quentes.',                   now(), now()),
('cat-3', 'Chás Especiais',      'chas-especiais',    'Infusões selecionadas para acalmar ou revigorar.',         now(), now()),
('cat-4', 'Confeitaria & Doces', 'confeitaria-doces', 'Doces artesanais de fabricação própria.',                  now(), now()),
('cat-5', 'Pães & Salgados',     'paes-salgados',     'Salgados assados na hora e pães de fermentação natural.', now(), now())
ON CONFLICT ("slug") DO UPDATE SET
    "name" = EXCLUDED."name",
    "description" = EXCLUDED."description",
    "updatedAt" = now();

INSERT INTO "Product" ("id", "name", "slug", "description", "price", "imageUrl", "isFeatured", "isAvailable", "categoryId", "createdAt", "updatedAt") VALUES
('prod-1',  'Espresso Stoll',         'espresso-stoll',         'Nosso blend exclusivo de grãos selecionados do sul de Minas. Sabor intenso com notas de cacau e avelã.',                              8.50,  'https://images.unsplash.com/photo-1510097252542-a481c2a7e9e2?q=80&w=600&auto=format&fit=crop', true,  true, 'cat-1', now(), now()),
('prod-2',  'Cappuccino Italiano',    'cappuccino-italiano',    'Espresso duplo, leite vaporizado super cremoso e polvilhado com cacau 100% importado.',                                              12.00, 'https://images.unsplash.com/photo-1571115177098-24ec4209e548?q=80&w=600&auto=format&fit=crop', true,  true, 'cat-1', now(), now()),
('prod-3',  'Stoll Latte Art',        'stoll-latte-art',        'Espresso curto misturado com leite vaporizado sedoso e finalizado com uma linda arte do barista.',                                   11.50, 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop', false, true, 'cat-1', now(), now()),
('prod-4',  'Cold Brew Citrus',       'cold-brew-citrus',       'Café extraído a frio por 18h combinado com um toque de limão siciliano, água tônica e muito gelo.',                                 14.90, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop', true,  true, 'cat-2', now(), now()),
('prod-5',  'Iced Caramel Macchiato', 'iced-caramel-macchiato', 'Espresso gelado com leite fresco, cubos de gelo e finalizado com nossa calda artesanal de caramelo salgado.',                       15.50, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop', false, true, 'cat-2', now(), now()),
('prod-6',  'Matcha Latte',           'matcha-latte',           'Chá verde matcha japonês de grau cerimonial, preparado tradicionalmente e misturado com leite vaporizado.',                         13.90, 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600&auto=format&fit=crop', false, true, 'cat-3', now(), now()),
('prod-7',  'Torta de Nozes Stoll',   'torta-nozes-stoll',      'Massa folhada levíssima recheada com doce de leite artesanal, nozes pecan picadas e ganache meio amargo.',                          18.00, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop', true,  true, 'cat-4', now(), now()),
('prod-8',  'Croissant de Amêndoas',  'croissant-amendoas',     'Clássica massa folhada francesa recheada com creme frangipane de amêndoas e polvilhada com açúcar impalpável.',                     16.50, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop', false, true, 'cat-4', now(), now()),
('prod-9',  'Pão de Queijo Canastra', 'pao-queijo-canastra',    'Pão de queijo assado na hora, crocante por fora e puxa por dentro, feito com queijo da Serra da Canastra legítimo.',               6.90,  'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop', true,  true, 'cat-5', now(), now()),
('prod-10', 'Toast de Avocado & Ovo', 'toast-avocado-ovo',      'Pão de fermentação natural grelhado, avocado temperado, ovo poché com gema mole, sementes tostadas e páprica.',                    22.00, 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop', false, true, 'cat-5', now(), now())
ON CONFLICT ("slug") DO UPDATE SET
    "name"        = EXCLUDED."name",
    "description" = EXCLUDED."description",
    "price"       = EXCLUDED."price",
    "imageUrl"    = EXCLUDED."imageUrl",
    "isFeatured"  = EXCLUDED."isFeatured",
    "isAvailable" = EXCLUDED."isAvailable",
    "categoryId"  = EXCLUDED."categoryId",
    "updatedAt"   = now();
