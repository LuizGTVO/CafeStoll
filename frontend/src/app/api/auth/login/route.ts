import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Configuração do Supabase ausente no servidor.' }, { status: 500 });
    }

    // Initialize public supabase client to perform login
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user || !data.session) {
      return NextResponse.json({ error: error?.message || 'Credenciais inválidas' }, { status: 400 });
    }

    // Sync user with local PostgreSQL DB via Prisma
    let user = await prisma.user.findUnique({
      where: { supabaseUid: data.user.id }
    });

    if (!user) {
      // If user doesn't exist in Prisma DB, create it.
      // If it is admin@cafestoll.com, assign ADMIN role, else CUSTOMER
      const role = email === 'admin@cafestoll.com' ? 'ADMIN' : 'CUSTOMER';
      user = await prisma.user.create({
        data: {
          supabaseUid: data.user.id,
          email,
          role,
        }
      });
    }

    return NextResponse.json({
      message: 'Login realizado com sucesso!',
      token: data.session.access_token,
      user: {
        id: user.id,
        supabaseUid: user.supabaseUid,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: error.message || 'Erro interno ao realizar login' }, { status: 500 });
  }
}
