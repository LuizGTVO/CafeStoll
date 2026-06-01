import { prisma } from '@/lib/db';

export const subscribeEmail = async (email: string) => {
  return prisma.newsletter.upsert({
    where: { email },
    update: { isActive: true },
    create: { email, isActive: true },
  });
};

export const getSubscribers = async () => {
  return prisma.newsletter.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const unsubscribeEmail = async (email: string) => {
  return prisma.newsletter.update({
    where: { email },
    data: { isActive: false },
  });
};
