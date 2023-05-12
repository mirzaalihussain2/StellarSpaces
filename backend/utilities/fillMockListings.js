// Import Prisma
const { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();

// Import data
const mockListings = require('./mock-listings.json');

// Fill DB
async function createMany (mockListings) {
  return await prisma.listing.createMany({data: mockListings})
};

createMany(mockListings);