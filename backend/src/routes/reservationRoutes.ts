import { Router } from 'express';
import { createReservation, getReservations, updateReservationStatus } from '@/controllers/reservationController';
import { requireAuth, requireAdmin } from '@/middlewares/authMiddleware';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { CreateReservationSchema } from '@/schemas/zodSchemas';

const router = Router();

router.post('/', validateRequest(CreateReservationSchema), createReservation);
router.get('/', requireAuth, requireAdmin, getReservations);
router.put('/:id/status', requireAuth, requireAdmin, updateReservationStatus);

export default router;
