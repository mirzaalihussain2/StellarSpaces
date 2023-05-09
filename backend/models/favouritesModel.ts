import { ListenOptions } from 'net';
import { Favourites } from '../interfaces/Favourite';
import { Listing } from '../interfaces/Listing';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add a listing to user's favourites
async function addFavourite(data: Favourites) {
  return await prisma.favourites.create({
    data,
  });
}

// Get all favourites for a user
async function getFavouritesByUserId(userId: Favourites['userId']) {
  return await prisma.favourites.findMany({
    where: {
      userId: userId,
      deletedAt: null,
    },
    include: {
      listing: true,
    },
  });
}

// Get all favourites for a listing
async function getFavouritesByListingId(listingId: Favourites['listingId']) {
  return await prisma.favourites.findMany({
    where: {
      listingId: listingId,
      deletedAt: null,
    },
    include: {
      user: true,
    },
  });
}

// Get all users who have favourited a listing
async function getUsersByListingId(listingId: Favourites['id']) {
  const favourites = await prisma.favourites.findMany({
    where: {
      listingId: listingId,
      deletedAt: null,
    },
    select: {
      userId: true,
    },
  });

  const userIds = favourites.map((favourite: Favourites) => favourite.userId);

  return await prisma.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
}

// Remove a favourite by ID (Soft delete)
async function softDeleteFavourite(id: Favourites['id']) {
  return await prisma.favourites.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}

// Export the CRUD operations
module.exports = {
  addFavourite,
  getFavouritesByUserId,
  getFavouritesByListingId,
  getUsersByListingId,
  softDeleteFavourite,
};
