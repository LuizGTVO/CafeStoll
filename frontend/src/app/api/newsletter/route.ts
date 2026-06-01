import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// POST /api/newsletter
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'E-mail é obrigatório' }, { status: 400 });
    }
    const subscriber = await prisma.newsletter.upsert({
      where: { email },
      update: { isActive: true },
      create: { email, isActive: true },
    });
    return NextResponse.json({ message: 'Inscrição realizada com sucesso!', subscriber }, { status: 201 });
  } catch (error: any) {
    console.error('Error subscribing newsletter:', error);
    return NextResponse.json({ error: error.message || 'Erro ao realizar inscrição' }, { status: 500 });
  }
}
