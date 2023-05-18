// Local imports
import {
  createMsg,
  getMessagesByChatId
} from '../models/messageModel';

// Global imports
import { NextFunction, Request, Response } from 'express';

// Main

// CONTROLLER FUNCTION (FOR PROD) - Retrieve messages by chatId
async function retrieveMessagesOnChat (req: Request, res: Response, next: NextFunction) {
  try {
    const chatId = parseInt(req.params.id);
    const messagesArray = await getMessagesByChatId(chatId);
    res.status(200).json(messagesArray);
  } catch (error) {
    next(error);
  }
};

// UTILITY FUNCTION (FOR TESTING) - Create message & set chat.updatedAt to current datetime
async function createMessage (req: Request, res: Response, next: NextFunction) {
  try {
    const message = await createMsg(req.body);
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

// Exports
export {
  retrieveMessagesOnChat, // controller function in prod
  createMessage // utility function
};