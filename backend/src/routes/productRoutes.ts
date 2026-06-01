import { Router } from 'express';
import multer from 'multer';
import { getProducts, getProductBySlug, createProduct, deleteProduct } from '@/controllers/productController';
import { requireAuth, requireAdmin } from '@/middlewares/authMiddleware';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { CreateProductSchema } from '@/schemas/zodSchemas';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);

router.post(
  '/',
  requireAuth,
  requireAdmin,
  upload.single('image'),
  validateRequest(CreateProductSchema),
  createProduct
);

router.delete(
  '/:id',
  requireAuth,
  requireAdmin,
  deleteProduct
);

export default router;
