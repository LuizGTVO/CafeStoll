import { prisma } from '@/lib/db';

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

export const createCategory = async (data: { name: string; slug: string; description?: string }) => {
  return prisma.category.create({
    data,
  });
};
