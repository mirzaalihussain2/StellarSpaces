// Local imports
import type { Message } from '@prisma/client';
import prisma from '../prisma/client';

// List of MESSAGE model functions
  // (1) Create new message
  // (2) Get all messages for a chatId, as array, ordered by datetime

async function createMsg (data: Omit<Message, 'createdAt' | 'updatedAt' | 'id'>) {
  return await prisma.message.create({
    data
  });
};

async function getMessagesByChatId (id: Message['chatId']) {
  return await prisma.message.findMany({
    where: { chatId: id },
    orderBy: { createdAt: 'asc' }
  })
};

// Export the CRUD operations
export {
  createMsg,
  getMessagesByChatId
};