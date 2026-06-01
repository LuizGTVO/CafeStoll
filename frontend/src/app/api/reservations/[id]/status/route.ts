import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// PUT /api/reservations/[id]/status
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status },
    });
    return NextResponse.json({ message: 'Status da reserva atualizado!', reservation });
  } catch (error) {
    console.error('Error updating reservation status:', error);
    return NextResponse.json({ error: 'Erro ao atualizar status da reserva' }, { status: 500 });
  }
}
