import { Router } from 'express';
import {
  createUsers,
  getAllUser,
  getUsersById,
  updateUsers,
  softDeleteUsers,
  hardDeleteUsers,
} from '../controllers/userController';

const router = Router();

router.post('/', createUsers);
router.get('/', getAllUser);
router.get('/:id', getUsersById);
router.put('/:id', updateUsers);
router.put('/:id/soft', softDeleteUsers);
router.delete('/:id', hardDeleteUsers);

export default router;
