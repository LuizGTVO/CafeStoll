import { prisma } from '@/lib/db';

export interface CreateContactMessageInput {
  name: string;
  email: string;
  message: string;
}

export const createMessage = async (data: CreateContactMessageInput) => {
  return prisma.contactMessage.create({
    data,
  });
};

export const getMessages = async () => {
  return prisma.contactMessage.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const markMessageAsRead = async (id: string) => {
  return prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });
};
