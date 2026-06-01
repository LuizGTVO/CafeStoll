import { prisma } from '@/lib/db';

export const getProducts = async (filters: { categorySlug?: string; featured?: boolean }) => {
  const where: any = { isAvailable: true };

  if (filters.categorySlug) {
    where.category = { slug: filters.categorySlug };
  }

  if (filters.featured !== undefined) {
    where.isFeatured = filters.featured;
  }

  return prisma.product.findMany({
    where,
    include: {
      category: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
};

export const getProductBySlug = async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
};

export const createProduct = async (data: {
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  isFeatured?: boolean;
}) => {
  return prisma.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      categoryId: data.categoryId,
      isFeatured: data.isFeatured ?? false,
    },
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
