// Import Prisma
const { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();

// Import data
const mockUsers = require('./mock-users.json');

// Fill DB
async function createMany (mockUsers) {
  return await prisma.user.createMany({data: mockUsers})
};

createMany(mockUsers);