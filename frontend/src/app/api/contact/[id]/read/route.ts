import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// PUT /api/contact/[id]/read
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
    return NextResponse.json({ messageText: 'Mensagem marcada como lida!', contactMessage: message });
  } catch (error) {
    console.error('Error marking message as read:', error);
    return NextResponse.json({ error: 'Erro ao marcar mensagem como lida' }, { status: 500 });
  }
}
