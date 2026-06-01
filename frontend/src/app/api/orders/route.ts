import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Erro ao buscar pedidos' }, { status: 500 });
  }
}

// POST /api/orders
export async function POST(req: NextRequest) {
  try {
    const { customerName, customerEmail, total, items } = await req.json();
    if (!customerName || !customerEmail || !items?.length) {
      return NextResponse.json({ error: 'Dados do pedido incompletos' }, { status: 400 });
    }
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        total,
        items: {
          create: items.map((item: { productId: string; quantity: number; price: number }) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });
    return NextResponse.json({ message: 'Pedido criado com sucesso!', order }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message || 'Erro ao criar pedido' }, { status: 500 });
  }
}
