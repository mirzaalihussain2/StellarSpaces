// Global imports
import { Router } from 'express';
const router = Router();

// Local imports
import {
  addFavourites,
  deleteFavourites,
  getUserFavourites,
  getListingFavourites,
  countListingFavourites
} from '../controllers/favouriteControllers';

// Routes
router.post('/', addFavourites);
router.delete('/', deleteFavourites);
router.get('/user/:id', getUserFavourites);
router.get('/listing/:id', getListingFavourites);
router.get('/:id', countListingFavourites);

export default router;