import { Router } from 'express';
import {
  createListings,
  fetchListings,
  getListingsById,
  updateListings,
  hardDeleteListings
} from '../controllers/listingsController';

const router = Router();

router.post('/', createListings);
router.get('/', fetchListings);
router.get('/:id', getListingsById);
router.put('/:id', updateListings);
router.delete('/:id', hardDeleteListings);

export default router;
