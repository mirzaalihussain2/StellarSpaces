import { Router } from 'express';
import { create, getAll, remove } from '../controllers/imagesController';
import { authenticateJwt } from '../middleware/auth';

const router = Router();

// Route to add an image to a listing
router.post('/listings/:listingId/images', authenticateJwt, create);

// Route to delete an image from a listing
router.delete('/listings/:listingId/images/:imageId', authenticateJwt, remove);

router.get('/listings/:listingId/images/get', getAll);

export default router;
