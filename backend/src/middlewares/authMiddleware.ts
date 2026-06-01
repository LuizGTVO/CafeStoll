import { Request, Response, NextFunction } from 'express';
import { supabase } from '@/lib/supabase';
import { prisma } from '@/lib/db';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    supabaseUid: string;
    email: string;
    role: 'ADMIN' | 'CUSTOMER';
  };
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    
    // Call Supabase API to verify JWT
    const { data: { user: authUser }, error } = await supabase.auth.getUser(token);

    if (error || !authUser) {
      return res.status(401).json({ error: 'Token de autenticação inválido ou expirado' });
    }

    // Look up or auto-sync user locally in our database
    let dbUser;
    try {
      dbUser = await prisma.user.findUnique({
        where: { supabaseUid: authUser.id },
      });

      if (!dbUser) {
        // Sync user to PostgreSQL if they exist in Supabase but not yet locally
        dbUser = await prisma.user.create({
          data: {
            supabaseUid: authUser.id,
            email: authUser.email || '',
            role: 'CUSTOMER',
          },
        });
      }
    } catch (dbError) {
      console.warn('Database error when fetching user, fallback to temporary request user context', dbError);
      dbUser = {
        id: `mock-user-${authUser.id}`,
        supabaseUid: authUser.id,
        email: authUser.email || '',
        role: 'CUSTOMER',
      };
    }

    req.user = {
      id: dbUser.id,
      supabaseUid: dbUser.supabaseUid,
      email: dbUser.email,
      role: dbUser.role as 'ADMIN' | 'CUSTOMER',
    };

    return next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Erro interno ao validar autenticação' });
  }
};

export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem acessar esta rota' });
  }
  return next();
};
