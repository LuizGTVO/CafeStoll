import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/contact
export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Erro ao buscar mensagens' }, { status: 500 });
  }
}

// POST /api/contact
export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }
    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, message },
    });
    return NextResponse.json({ message: 'Mensagem enviada com sucesso!', contactMessage }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ error: error.message || 'Erro ao enviar mensagem' }, { status: 500 });
  }
}
