import { Request, Response } from 'express';
import * as categoryService from '@/services/categoryService';
import { mockCategories } from '@/utils/mockData';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ error: 'Erro ao buscar categorias no banco de dados' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description } = req.body;

    const category = await categoryService.createCategory({
      name,
      slug,
      description,
    });

    return res.status(201).json({
      message: 'Categoria criada com sucesso!',
      category,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return res.status(500).json({ error: 'Erro interno ao cadastrar categoria' });
  }
};
