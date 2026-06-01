import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// PUT /api/orders/[id]/status
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ message: 'Status atualizado!', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ error: 'Erro ao atualizar status do pedido' }, { status: 500 });
  }
}
