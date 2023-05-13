// Local imports
import { Favourite } from '../interfaces/Favourite';
import prisma from '../prisma/client';

// (1) User favourites a listing - create record in Listings table
// (2) User un-favourites a listing - delete record in Listings table
// (3) Return a list of a properties / propertyIds that a user has favourited
// (4) Return the number of favourites a specific property has against it
// (5) Return a landlord's most popular properties by number of favourites - most favourites at top

// async function hardDeleteFavourite(id: Favourite['id']) {
//   const favourite = await prisma.favourites.delete({
//     where: { id: id },
//   });
//   return favourite;
// }

// Favourite a listing for a user
async function addFavourite (data: Favourite) {
  return await prisma.favourites.create({
    data
  });
};

// Un-favourite a list for a user (i.e. delete record)
async function deleteFavourite (data: Favourite) {
  return await prisma.favourites.deleteMany({
    where: {
      userId: data.userId,
      listingId: data.listingId
    }
  });
};

// Get a list of property Ids a user has favourited
async function getFavouritesByUserId (id: Favourite['userId']) {
  return await prisma.favourites.findMany({
    where: { userId: id },
    select: { listingId: true }
  });
};

// Get the number of times a property has been favourited
async function getFavouritesByListingId (id: Favourite['listingId']) {
  return await prisma.favourites.findMany({
    where: { listingId: id },
    select: { userId: true }
  });
};

async function countFavouritesByListingId (id: Favourite['listingId']) {
  return await prisma.favourites.count({
    where: { listingId: id }
  });
};

// Get all favourites for a user
// async function getFavouritesByUserId(userId: Favourite['userId']) {
//   return await prisma.favourites.findMany({
//     where: {
//       userId: userId,
//       deletedAt: null,
//     },
//     include: {
//       listing: true,
//     },
//   });
// }

// // Get all favourites for a listing
// async function getFavouritesByListingId(listingId: Favourite['listingId']) {
//   return await prisma.favourites.findMany({
//     where: {
//       listingId: listingId,
//       deletedAt: null,
//     },
//     include: {
//       user: true,
//     },
//   });
// }

// // Remove a favourite by ID (Soft delete)
// async function softDeleteFavourite(id: Favourite['id']) {
//   return await prisma.favourites.update({
//     where: {
//       id: id,
//     },
//     data: {
//       deletedAt: new Date(),
//     },
//   });
// }



// Export the CRUD operations
export {
  addFavourite,
  deleteFavourite,
  getFavouritesByUserId,
  getFavouritesByListingId,
  countFavouritesByListingId
  // softDeleteFavourite,
  // hardDeleteFavourite,
};
