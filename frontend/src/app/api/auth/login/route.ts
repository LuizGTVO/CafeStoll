import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    // Use a senha definida em ADMIN_PASSWORD no Vercel/env, ou 'admindono' como padrão
    const adminPassword = process.env.ADMIN_PASSWORD || 'admindono';

    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Senha incorreta. Por favor, tente novamente.' }, { status: 400 });
    }

    return NextResponse.json({
      message: 'Login realizado com sucesso!',
      token: 'admin-secret-session-token-999',
      user: {
        id: 'admin-id-123',
        email: 'admin@cafestoll.com',
        role: 'ADMIN',
      }
    });
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Erro interno ao realizar login' }, { status: 500 });
  }
}
