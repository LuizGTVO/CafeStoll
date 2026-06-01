import { Router } from 'express';
import { createMessage, getMessages, markMessageAsRead } from '@/controllers/contactController';
import { requireAuth, requireAdmin } from '@/middlewares/authMiddleware';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { CreateContactMessageSchema } from '@/schemas/zodSchemas';

const router = Router();

router.post('/', validateRequest(CreateContactMessageSchema), createMessage);
router.get('/', requireAuth, requireAdmin, getMessages);
router.put('/:id/read', requireAuth, requireAdmin, markMessageAsRead);

export default router;
