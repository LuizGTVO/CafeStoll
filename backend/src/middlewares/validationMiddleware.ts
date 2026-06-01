import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateRequest = (schema: z.ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodError = error as any;
        return res.status(400).json({
          error: 'Dados de entrada inválidos',
          details: zodError.errors.map((err: any) => ({
            field: err.path.join('.').replace('body.', '').replace('query.', '').replace('params.', ''),
            message: err.message,
          })),
        });
      }
      return res.status(500).json({ error: 'Erro interno ao validar dados' });
    }
  };
};
