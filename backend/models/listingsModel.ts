import { Listing } from '../interfaces/Listing';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new listing
async function createListing(data: Listing) {
  return await prisma.listing.create({
    data,
  });
}

// Get all listings
async function getListings() {
  return await prisma.listing.findMany({
    where: {
      deletedAt: null,
    },
  });
}

// Get a listing by ID
async function getListingById(id: Listing['id']) {
  return await prisma.listing.findUnique({
    where: {
      id: id,
    },
  });
}

// Update a listing by ID
async function updateListing(id: Listing['id'], data: Listing) {
  return await prisma.listing.update({
    where: {
      id: id,
    },
    data,
  });
}

// Soft delete a listing by ID
async function softDeleteListing(id: Listing['id']) {
  const listing = await prisma.listing.update({
    where: { id: id },
    data: { deletedAt: new Date() },
    include: {
      Image: {
        update: { data: { deletedAt: new Date() }, where: { deletedAt: null } },
      },
      favourites: {
        update: { data: { deletedAt: new Date() }, where: { deletedAt: null } },
      },
      chats: {
        update: { data: { deletedAt: new Date() }, where: { deletedAt: null } },
      },
    },
  });
  return listing;
}

// Hard delete a listing by ID
async function hardDeleteListing(id: Listing['id']) {
  const listing = await prisma.listing.delete({
    where: { id: id },
    include: {
      Image: true,
      favourites: true,
      chats: true,
    },
  });
  return listing;
}

export {
  createListing,
  getListings,
  getListingById,
  updateListing,
  softDeleteListing,
  hardDeleteListing,
};
