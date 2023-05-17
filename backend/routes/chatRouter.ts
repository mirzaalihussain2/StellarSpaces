// Global imports
import { Router } from 'express';
const router = Router();

// Local imports
import {
  // CONTROLLER FUNCTIONS (FOR PROD)
  sendMessage,
  getChats,
  retrieveChatsByUser,
  retrieveChatsByListing,

  // UTILITY FUNCTIONS (CONNECTED TO ROUTES FOR TESTING)
  getLandlordId,
  retrieveChatByChatId,
  retrieveChatByUniqueKey,
  createNewChat,
  updateChat
} from '../controllers/chatController';

// PROD ROUTES
router.post('/sendMsg', sendMessage);
router.get("/", getChats);
router.get('/user/:userId', retrieveChatsByUser);
router.get('/listing/:listingId', retrieveChatsByListing);

// UTILITY ROUTES
router.get('/landlord/:listingId', getLandlordId);
router.get('/chatId/:chatId', retrieveChatByChatId);
router.get('/:listingId/:landlordId/:tenantId', retrieveChatByUniqueKey);
router.post('/createChat', createNewChat);
router.put('/update/:chatId', updateChat);

export default router;