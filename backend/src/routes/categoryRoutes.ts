import { Router } from 'express';
import { getCategories, createCategory } from '@/controllers/categoryController';
import { requireAuth, requireAdmin } from '@/middlewares/authMiddleware';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { CreateCategorySchema } from '@/schemas/zodSchemas';

const router = Router();

router.get('/', getCategories);
router.post('/', requireAuth, requireAdmin, validateRequest(CreateCategorySchema), createCategory);

export default router;
