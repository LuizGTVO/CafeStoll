import { Router } from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import orderRoutes from './orderRoutes';
import reservationRoutes from './reservationRoutes';
import contactRoutes from './contactRoutes';
import newsletterRoutes from './newsletterRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/reservations', reservationRoutes);
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'CaféStoll Backend is fully operational.' });
});

export default router;
