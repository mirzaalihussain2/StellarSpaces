// import { Favourites } from '../interfaces/Favourite';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// // Add a listing to user's favourites
// async function addFavourite(data: Favourites) {
//   const { userId, listingId } = data;
//   return await prisma.favourites.create({
//     data: {
//       userId,
//       listingId,
//     },
//   });
// }

// // Get all favourites for a user
// async function getFavouritesByUserId(userId: Favourites['userId']) {
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
// async function getFavouritesByListingId(listingId: Favourites['listingId']) {
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
// async function softDeleteFavourite(id: Favourites['id']) {
//   return await prisma.favourites.update({
//     where: {
//       id: id,
//     },
//     data: {
//       deletedAt: new Date(),
//     },
//   });
// }

// async function hardDeleteFavourite(id: Favourites['id']) {
//   const favourite = await prisma.favourites.delete({
//     where: { id: id },
//   });
//   return favourite;
// }

// // Export the CRUD operations
// export {
//   addFavourite,
//   getFavouritesByUserId,
//   getFavouritesByListingId,
//   softDeleteFavourite,
//   hardDeleteFavourite,
// };
