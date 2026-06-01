import { prisma } from '@/lib/db';

export interface CreateOrderItemInput {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  total: number;
  items: CreateOrderItemInput[];
}

export const createOrder = async (data: CreateOrderInput) => {
  return prisma.order.create({
    data: {
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      total: data.total,
      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getOrders = async () => {
  return prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const updateOrderStatus = async (id: string, status: 'PENDING' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED') => {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
};
