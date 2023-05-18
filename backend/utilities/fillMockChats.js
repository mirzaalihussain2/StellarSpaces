// Import Prisma
const { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();

// Import data
const mockChats = require('./mock-chats.json');

// Fill DB
async function createMany (mockChats) {
  return await prisma.chat.createMany({data: mockChats})
};

createMany(mockChats);