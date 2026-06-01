import { Request, Response } from 'express';
import { supabase } from '@/lib/supabase';
import { syncUser } from '@/services/userService';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError || !authData.user) {
      return res.status(400).json({ error: authError?.message || 'Erro ao cadastrar usuário' });
    }

    const user = await syncUser(authData.user.id, email);
    
    if (role === 'ADMIN') {
      const { updateUserRole } = await import('@/services/userService');
      await updateUserRole(user.id, 'ADMIN');
      user.role = 'ADMIN';
    }

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      user: {
        id: user.id,
        supabaseUid: user.supabaseUid,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar cadastro' });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user || !data.session) {
      return res.status(400).json({ error: error?.message || 'Credenciais inválidas' });
    }

    const user = await syncUser(data.user.id, email);

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      session: {
        access_token: data.session.access_token,
        expires_in: data.session.expires_in,
        refresh_token: data.session.refresh_token,
      },
      user: {
        id: user.id,
        supabaseUid: user.supabaseUid,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar login' });
  }
};
