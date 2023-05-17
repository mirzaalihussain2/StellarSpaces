// Local imports
import prisma from '../prisma/client';
import type { Chat } from '@prisma/client';

// List of CHAT model functions
  // (1) Create new chat, with initiator as tenant
  // (2) Get all chats for a user, as array, ordered by updatedAt datetime
  // (3) Get all chats for a listing, as array, order by updatedAt datetime
  // (4) Update updatedAt datetime to now on chat
  // (5) Determine whether chat between these two users on this listing already exists - return true / false
  // (6) Back-end utility function: get all chats from Chats table in DB
  // (7) Back-end utility function: get chat by ChatId (from Chats table)

// (1) Create new chat, with initiator as tenant
async function createChat (data: Omit<Chat, 'createdAt' | 'updatedAt' | 'id'>) {
  return await prisma.chat.create({
    data
  });
};

// (2) Get all chats for a user, as array, ordered by updatedAt datetime
async function getChatsByUserId (id: Chat['landlordId'] | Chat['tenantId']) {
  return await prisma.chat.findMany({
    where: {
      OR: [
        { landlordId: id },
        { tenantId: id }
      ]
    },
    orderBy: { updatedAt: 'asc' }
  })
};

// (3) Get all chats for a listing, as array, order by updatedAt datetime
async function getChatsByListingId (id: Chat['listingId']) {
  return await prisma.chat.findMany({
    where: { listingId: id },
    orderBy: { updatedAt: 'asc'}
  })
};

// (4) Update updatedAt datetime to now() on chat
async function newMsgUpdateChat (id: Chat['id']) {
  return await prisma.chat.update({
    where: { id: id },
    data: { updatedAt: new Date() }
  })
}

// (5) Determine whether chat between these two users on this listing already exists - return true / false
async function getChatByUniqueKey (data: Omit<Chat, 'createdAt' | 'updatedAt' | 'id'>) {
  return await prisma.chat.findFirst({
    where: data
  })
};

// (6) Back-end utility function: get all chats from Chats table in DB
async function getAllChats () {
  return await prisma.chat.findMany();
};

// (7) Back-end utility function: get chat by ChatId (from Chats table)
async function getChatByChatId (id: Chat['id']) {
  return await prisma.chat.findUnique({
    where: { id: id }
  })
};

// Export the CRUD operations
export {
  createChat,
  getChatsByUserId,
  getChatsByListingId,
  newMsgUpdateChat,
  getChatByUniqueKey,
  getAllChats,
  getChatByChatId
};