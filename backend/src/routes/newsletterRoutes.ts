import { Router } from 'express';
import { subscribeEmail, getSubscribers, unsubscribeEmail } from '@/controllers/newsletterController';
import { requireAuth, requireAdmin } from '@/middlewares/authMiddleware';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { SubscribeNewsletterSchema } from '@/schemas/zodSchemas';

const router = Router();

router.post('/subscribe', validateRequest(SubscribeNewsletterSchema), subscribeEmail);
router.post('/unsubscribe', validateRequest(SubscribeNewsletterSchema), unsubscribeEmail);
router.get('/', requireAuth, requireAdmin, getSubscribers);

export default router;
