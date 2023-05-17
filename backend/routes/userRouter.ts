import { Router } from 'express';
import {
  retrieveUser,
  createUsers,
  getAllUser,
  getUsersById,
  updateUsers,
  softDeleteUsers,
  hardDeleteUsers,
} from '../controllers/userController';
import { authController, authenticateJwt } from '../middleware/auth';

const router = Router();
// Create user
router.post('/', createUsers);
// Login user
router.post('/login', authController);
// Find user by email
router.get('/exist/:email', retrieveUser);
// Get all users
router.get('/', getAllUser);
// Get a specific user through their user ID
router.get('/:id', getUsersById);
// Update user information
router.put('/:id', authenticateJwt, updateUsers);
// Soft delete a user
router.put('/:id/soft', authenticateJwt, softDeleteUsers);
// Hard delete a user
router.delete('/:id', hardDeleteUsers);

export default router;
