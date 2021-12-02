import { Router } from 'express';
import { createUserController } from '../controllers/authController';

const router = Router();

router.post('/signup', createUserController);

export default router;
