import { Router } from 'express';
import { login, resetPassword } from '../controllers/authController';

const router = Router();

// Auth Routes
router.post('/login', login);
router.post('/reset-password', resetPassword);

export default router;