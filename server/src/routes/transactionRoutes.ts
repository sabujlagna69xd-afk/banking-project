import { Router } from 'express';
import { deposit, transfer } from '../controllers/transactionController';

const router = Router();

router.post('/deposit', deposit);
router.post('/transfer', transfer);

export default router;