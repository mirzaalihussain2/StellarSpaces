// Global imports
import { Router } from 'express';
const router = Router();

// Local imports
import {
  retrieveMessagesOnChat,
  createMessage
} from '../controllers/messageController';

// PROD ROUTES
router.get('/:id', retrieveMessagesOnChat);

// UTILITY ROUTES
router.post('/', createMessage);

export default router;