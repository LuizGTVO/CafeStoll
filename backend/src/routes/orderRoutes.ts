import { Router } from 'express';
import { createOrder, getOrders, updateOrderStatus } from '@/controllers/orderController';
import { requireAuth, requireAdmin } from '@/middlewares/authMiddleware';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { CreateOrderSchema } from '@/schemas/zodSchemas';

const router = Router();

router.post('/', validateRequest(CreateOrderSchema), createOrder);
router.get('/', requireAuth, requireAdmin, getOrders);
router.put('/:id/status', requireAuth, requireAdmin, updateOrderStatus);

export default router;
