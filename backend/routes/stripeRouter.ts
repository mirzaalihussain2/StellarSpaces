import { Router } from 'express';
import { authenticateJwt } from '../middleware/auth';

import { stripeTransaction } from '../stripe/stripe';
const router = Router();

router.post('/create-checkout-session', authenticateJwt, stripeTransaction);

export default router;
