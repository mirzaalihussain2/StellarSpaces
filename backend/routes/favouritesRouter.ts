// Global imports
import { Router } from 'express';
const router = Router();

// Local imports
import {
  addFavourites,
  deleteFavourites,
  getUserFavourites,
  getListingFavourites,
  countListingFavourites,
} from '../controllers/favouriteControllers';
import { authenticateJwt } from '../middleware/auth';

// Routes
router.post('/', authenticateJwt, addFavourites);
router.delete('/', authenticateJwt, deleteFavourites);
router.get('/user/:id', getUserFavourites);
router.get('/listing/:id', getListingFavourites);
router.get('/:id', countListingFavourites);

export default router;
