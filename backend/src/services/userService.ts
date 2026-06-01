import { prisma } from '@/lib/db';

export const syncUser = async (supabaseUid: string, email: string) => {
  return prisma.user.upsert({
    where: { supabaseUid },
    update: { email },
    create: {
      supabaseUid,
      email,
      role: 'CUSTOMER',
    },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const updateUserRole = async (id: string, role: 'ADMIN' | 'CUSTOMER') => {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
};
