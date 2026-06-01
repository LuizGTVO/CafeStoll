import { Router } from 'express';
import { signUp, signIn } from '@/controllers/authController';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { UserSignupSchema, UserSigninSchema } from '@/schemas/zodSchemas';

const router = Router();

router.post('/signup', validateRequest(UserSignupSchema), signUp);
router.post('/signin', validateRequest(UserSigninSchema), signIn);

export default router;
