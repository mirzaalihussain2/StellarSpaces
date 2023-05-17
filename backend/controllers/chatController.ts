// Local imports
import {
  createChat,
  getChatsByUserId,
  getChatsByListingId,
  newMsgUpdateChat,
  getChatByUniqueKey,
  getAllChats,
  getChatByChatId
} from '../models/chatModel';

import { createMsg } from '../models/messageModel';
import { getUserIdForListing } from '../models/listingsModel';

// Global imports
import { NextFunction, Request, Response } from 'express';

// CONTROLLER FUNCTIONS (running in PROD)

// CONTROLLER (FOR PROD): Send message (incl chat creation / continuation logic)
// req.body = {
//   listingId: 1,
//   content: "hello",
//   authorId: 7,
//   chatId: 12
// };
async function sendMessage (req: Request, res: Response, next: NextFunction) {
  try {
    const listingId = req.body.listingId;
    const landlordId = (await getUserIdForListing(listingId)).userId; // 12
    const chatObject = {
      listingId: listingId,
      landlordId: landlordId,
      tenantId: req.body.authorId
    };

    const chat = (req.body.authorId == landlordId)
    ? await getChatByChatId(req.body.chatId || 0) // chatId doesn't exist OR 0 passed in -> returns null
    : await getChatByUniqueKey(chatObject) // no chat -> returns null
    || await createChat(chatObject);

    if (chat) {
      const message = await createMsg({
        chatId: chat.id,
        authorId: req.body.authorId,
        content: req.body.content
      });
      const updatedChat = await newMsgUpdateChat(chat.id);
      res
        .status(201)
        .json({message: message, chat: updatedChat});
    } else {
      res.status(404).json({message: "Landlord's cannot initiate chats"})
    };

  } catch (error) {
    next(error);
  }
};

// CONTROLLER (FOR PROD): Get all chats
async function getChats (req: Request, res: Response, next: NextFunction) {
  try {
    const chats = await getAllChats();
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

// CONTROLLER (FOR PROD): Get chats by User Id
async function retrieveChatsByUser (req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseInt(req.params.userId);
    const userChats = await getChatsByUserId(userId);
    res.status(200).json(userChats);
  } catch (error) {
    next(error);
  }
};

// CONTROLLER (FOR PROD): Get chats by Listing Id
async function retrieveChatsByListing (req: Request, res: Response, next: NextFunction) {
  try {
    const listingId = parseInt(req.params.listingId);
    const listingChats = await getChatsByListingId(listingId);
    res.status(200).json(listingChats);
  } catch (error) {
    next(error);
  }
};

// UTILITY FUNCTIONS (FOR TESTING)

// UTILITY (FOR TESTING): Get landlordId // Output: userId (as number: 12) OR null
async function getLandlordId (req: Request, res: Response, next: NextFunction) {
  try {
    const listingId = parseInt(req.params.listingId);
    const landlordId = (await getUserIdForListing(listingId)).userId;
    res.status(200).json(landlordId);
  } catch (error) {
    next(error);
  }
};

// UTILITY (FOR TESTING): Get chat by chatId - determining whether a chat exists
async function retrieveChatByChatId (req: Request, res: Response, next: NextFunction) {
  try {
    const chatId = parseInt(req.params.chatId);
    const chat = await getChatByChatId(chatId);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
}

// UTILITY (FOR TESTING): Get chat by Unique Key
async function retrieveChatByUniqueKey (req: Request, res: Response, next: NextFunction) {
  try {
    const data = {
      listingId: parseInt(req.params.listingId),
      landlordId: parseInt(req.params.landlordId),
      tenantId: parseInt(req.params.tenantId)
    };
    const chat = await getChatByUniqueKey(data);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
}

// UTILITY (FOR TESTING): Create new chat as a tenant
async function createNewChat (req: Request, res: Response, next: NextFunction) {
  try {
    const chatObject = {
      listingId: req.body.listingId,
      landlordId: req.body.landlordId,
      tenantId: req.body.authorId
    };
    const chat = await createChat(chatObject);
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
};

// UTILITY (FOR TESTING): Set updatedAt time on chat to now
async function updateChat (req: Request, res: Response, next: NextFunction) {
  try {
    const chatId = parseInt(req.params.chatId);
    const updatedChat = await newMsgUpdateChat(chatId);
    res.status(201).json(updatedChat);
  } catch (error) {
    next(error);
  }
};

// Exports
export {
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
};