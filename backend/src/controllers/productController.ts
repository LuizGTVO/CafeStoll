import { Request, Response } from 'express';
import * as productService from '@/services/productService';
import * as storageService from '@/services/storageService';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;

    const filters = {
      categorySlug: category ? String(category) : undefined,
      featured: featured === 'true' ? true : featured === 'false' ? false : undefined,
    };
    
    const products = await productService.getProducts(filters);
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Erro ao buscar produtos no banco de dados' });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await productService.getProductBySlug(slug);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ error: 'Erro ao buscar detalhes do produto no banco de dados' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, price, categoryId, isFeatured } = req.body;
    let imageUrl = req.body.imageUrl || '';

    if (req.file) {
      imageUrl = await storageService.uploadImage(req.file.buffer, req.file.originalname, req.file.mimetype);
    }

    if (!imageUrl) {
      return res.status(400).json({ error: 'Uma imagem ou link de imagem é obrigatória para criar o produto' });
    }

    const product = await productService.createProduct({
      name,
      slug,
      description,
      price: Number(price),
      imageUrl,
      categoryId,
      isFeatured: isFeatured === 'true' || isFeatured === true,
    });

    return res.status(201).json({
      message: 'Produto criado com sucesso!',
      product,
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return res.status(500).json({ error: error.message || 'Erro interno ao cadastrar produto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    return res.status(200).json({ message: 'Produto excluído com sucesso!' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Erro ao excluir produto no banco de dados' });
  }
};

