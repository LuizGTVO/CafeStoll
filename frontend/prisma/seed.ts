import { PrismaClient } from '@prisma/client';
import { mockCategories, mockProducts } from '../src/lib/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o povoamento do banco de dados (Seeding)...');

  for (const cat of mockCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: { id: cat.id, name: cat.name, slug: cat.slug, description: cat.description },
    });
  }
  console.log('✅ Categorias povoadas!');

  for (const prod of mockProducts) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: { name: prod.name, description: prod.description, price: prod.price, imageUrl: prod.imageUrl, isFeatured: prod.isFeatured, isAvailable: prod.isAvailable, categoryId: prod.categoryId },
      create: { id: prod.id, name: prod.name, slug: prod.slug, description: prod.description, price: prod.price, imageUrl: prod.imageUrl, isFeatured: prod.isFeatured, isAvailable: prod.isAvailable, categoryId: prod.categoryId },
    });
  }
  console.log('✅ Produtos povoados!');
}

main()
  .catch((e) => { console.error('Erro ao povoar o banco:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
