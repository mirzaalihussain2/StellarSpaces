import { Router } from 'express';
import {
  createListings,
  fetchListings,
  getListingsById,
  updateListings,
  hardDeleteListings
} from '../controllers/listingsController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJwt, createListings);
router.get('/', fetchListings);
router.get('/:id', getListingsById);
router.put('/:id', authenticateJwt, updateListings);
router.delete('/:id', authenticateJwt, hardDeleteListings);

export default router;
