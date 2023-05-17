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

import {
  createMsg
} from '../models/messageModel';

import {
  getUserIdForListing
} from '../models/listingsModel';

// import type { Chat } from '@prisma/client';

// Global imports
import { NextFunction, Request, Response } from 'express';

// Main

// req.body = {
//   listingId: 1,
//   content: "hello",
//   authorId: 7,
//   chatId: 12
// };

async function initiateConvo (req: Request, res: Response, next: NextFunction) {
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
      res.status(400).json({message: "Landlord's cannot initiate chats"})
    };

  } catch (error) {
    next(error);
  }
};


// getLandlordId,
// retrieveChatByChatId,
// retrieveChatByUniqueKey,
// createNewChat,
// updateChat

// }


// Chat doesn't exist
  // Create chat & message
// Chat does exist
  // Create message, update chat

// Create new chat if chat doesn't already exist
// Expected body:
  // CHAT - listingId, landlordId, tenantTd
  // MSG - content, authorId, chatId

// create message / chat is a POST request
// what are we expecting in request body?
  // chat.listingId
  // chat.landlordId
  // chat.tenantId

  // message.content



// Get all chats
async function getChats (req: Request, res: Response, next: NextFunction) {
  try {
    const chats = await getAllChats();
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

// Get chats by User Id
async function retrieveChatsByUser (req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseInt(req.params.userId);
    const userChats = await getChatsByUserId(userId);
    res.status(200).json(userChats);
  } catch (error) {
    next(error);
  }
};

// Get chats by Listing Id
async function retrieveChatsByListing (req: Request, res: Response, next: NextFunction) {
  try {
    const listingId = parseInt(req.params.listingId);
    const listingChats = await getChatsByListingId(listingId);
    res.status(200).json(listingChats);
  } catch (error) {
    next(error);
  }
};

// Get landlordId // Output: userId (as number: 12) OR null
async function getLandlordId (req: Request, res: Response, next: NextFunction) {
  try {
    const listingId = parseInt(req.params.listingId);
    const landlordId = (await getUserIdForListing(listingId)).userId;
    res.status(200).json(landlordId);
  } catch (error) {
    next(error);
  }
};

// Get chat by chatId - determining whether a chat exists
async function retrieveChatByChatId (req: Request, res: Response, next: NextFunction) {
  try {
    const chatId = parseInt(req.params.chatId);
    const chat = await getChatByChatId(chatId);
    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
}

// Get chat by Unique Key
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

// Number, AND record exists in chatTable
// {
//   "id": 6,
//   "createdAt": "2023-05-17T12:49:34.992Z",
//   "updatedAt": "2023-05-17T12:49:34.992Z",
//   "listingId": 6,
//   "landlordId": 6,
//   "tenantId": 94
// }

// Number, BUT record NOT exist in chatTable
// empty object {} --> truthy

// for this GET request, IF chatId not passed in as a parameter
// then route will error - even if chatid = parseInt(params) || 6
// i.e. will not fallback to 6.

// if (chat == null) {
//   res.json({message:'Nothing to show'})
// } else (res.status(200).json(chat));


// Create new chat as a tenant
async function createNewChat (req: Request, res: Response, next: NextFunction) {
  try {
    const chat = await createChat({
      listingId: req.body.listingId,
      landlordId: req.body.landlordId,
      tenantId: req.body.tenantId
    });
    res.status(201).json(chat);
  } catch (error) {
    next(error);
  }
};

// Set updatedAt time on chat to now
async function updateChat (req: Request, res: Response, next: NextFunction) {
  try {
    const chatId = parseInt(req.params.chatId);
    const updatedChat = await newMsgUpdateChat(chatId);
    res.status(201).json(updatedChat);
  } catch (error) {
    next(error);
  }
};

// Export the controller functions
export {
  retrieveChatsByUser,
  retrieveChatsByListing,
  getChats,
  getLandlordId,
  retrieveChatByChatId,
  retrieveChatByUniqueKey,
  createNewChat,
  updateChat,
  initiateConvo
};