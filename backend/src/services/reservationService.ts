import { prisma } from '@/lib/db';

export interface CreateReservationInput {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guestsCount: number;
}

export const createReservation = async (data: CreateReservationInput) => {
  return prisma.reservation.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      guestsCount: data.guestsCount,
    },
  });
};

export const getReservations = async () => {
  return prisma.reservation.findMany({
    orderBy: {
      date: 'asc',
    },
  });
};

export const updateReservationStatus = async (id: string, status: 'PENDING' | 'CONFIRMED' | 'CANCELLED') => {
  return prisma.reservation.update({
    where: { id },
    data: { status },
  });
};
