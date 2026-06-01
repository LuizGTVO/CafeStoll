import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET /api/reservations
export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({ orderBy: { date: 'asc' } });
    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({ error: 'Erro ao buscar reservas' }, { status: 500 });
  }
}

// POST /api/reservations
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, date, time, guestsCount } = await req.json();
    if (!name || !email || !phone || !date || !time || !guestsCount) {
      return NextResponse.json({ error: 'Dados da reserva incompletos' }, { status: 400 });
    }
    const reservation = await prisma.reservation.create({
      data: { name, email, phone, date, time, guestsCount: Number(guestsCount) },
    });
    return NextResponse.json({ message: 'Reserva realizada com sucesso!', reservation }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating reservation:', error);
    return NextResponse.json({ error: error.message || 'Erro ao criar reserva' }, { status: 500 });
  }
}
