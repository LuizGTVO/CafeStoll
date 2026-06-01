import { z } from 'zod';

export const UserSignupSchema = z.object({
  body: z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    role: z.enum(['ADMIN', 'CUSTOMER']).optional(),
  }),
});

export const UserSigninSchema = z.object({
  body: z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(1, 'Senha é obrigatória'),
  }),
});

export const CreateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nome da categoria deve ter pelo menos 2 caracteres'),
    slug: z.string().min(2, 'Slug deve ter pelo menos 2 caracteres'),
    description: z.string().optional(),
  }),
});

export const CreateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nome do produto deve ter pelo menos 2 caracteres'),
    slug: z.string().min(2, 'Slug deve ter pelo menos 2 caracteres'),
    description: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
    price: z.coerce.number().positive('Preço deve ser maior que zero'),
    categoryId: z.string().min(1, 'ID da categoria é obrigatório'),
    isFeatured: z.preprocess((val) => val === 'true' || val === true, z.boolean()).optional(),
    imageUrl: z.string().url('URL da imagem inválida').optional(),
  }),
});

export const CreateOrderSchema = z.object({
  body: z.object({
    customerName: z.string().min(2, 'Nome do cliente deve ter pelo menos 2 caracteres'),
    customerEmail: z.string().email('E-mail inválido'),
    total: z.number().positive('Total deve ser maior que zero'),
    items: z.array(
      z.object({
        productId: z.string().min(1, 'ID do produto é obrigatório'),
        quantity: z.number().int().positive('Quantidade deve ser pelo menos 1'),
        price: z.number().positive('Preço do item deve ser positivo'),
      })
    ).min(1, 'O pedido deve conter pelo menos um item'),
  }),
});

export const CreateReservationSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    phone: z.string().min(8, 'Telefone deve ter pelo menos 8 dígitos'),
    date: z.string().min(1, 'Data é obrigatória'),
    time: z.string().min(1, 'Horário é obrigatório'),
    guestsCount: z.number().int().min(1, 'Mínimo de 1 convidado').max(20, 'Máximo de 20 convidados por mesa'),
  }),
});

export const CreateContactMessageSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    message: z.string().min(5, 'Mensagem deve ter pelo menos 5 caracteres'),
  }),
});

export const SubscribeNewsletterSchema = z.object({
  body: z.object({
    email: z.string().email('E-mail inválido'),
  }),
});
