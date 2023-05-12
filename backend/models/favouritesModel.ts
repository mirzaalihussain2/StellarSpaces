// Local imports
import { Favourite } from '../interfaces/Favourite';
import prisma from '../prisma/client';

// (1) User favorurites a listing - create record in Listings table
// (2) User un-favourites a listing - delete record in Listings table
// (3) Return a list of a properties / propertyIds that a user has favourited
// (4) Return the number of favourites a specific property has against it
// (5) Return a landlord's most popular properties by number of favourites - most favourites at top


async function addFavourite (data: Favourite) {
  return await prisma.favourites.create({
    data
  });
};

// Add a listing to user's favourites
// async function addFavourite(data: Favourite) {
//   const { userId, listingId } = data;
//   return await prisma.favourites.create({
//     data: {
//       userId,
//       listingId,
//     },
//   });
// }

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

// async function hardDeleteFavourite(id: Favourite['id']) {
//   const favourite = await prisma.favourites.delete({
//     where: { id: id },
//   });
//   return favourite;
// }

// Export the CRUD operations
export {
  addFavourite
  // getFavouritesByUserId,
  // getFavouritesByListingId,
  // softDeleteFavourite,
  // hardDeleteFavourite,
};
