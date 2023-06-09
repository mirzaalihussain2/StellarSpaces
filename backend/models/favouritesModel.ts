// Local imports
import { Favourite } from '../interfaces/Favourite';
import prisma from '../prisma/client';

import { User } from '../interfaces/User';
import { Listing } from '../interfaces/Listing';

// IMPLEMENTED
  // (1) User favourites a listing - create record in Listings table
  // (2) User un-favourites a listing - delete record in Listings table
  // (3) Return a list of a properties / propertyIds that a user has favourited
  // (4) Return the number of favourites a specific property has against it

// NOT IMPLEMENTED
  // (5) Return a landlord's most popular properties by number of favourites - most favourites at top

// Favourite a listing for a user
async function addFavourite (data: Favourite) {
  return await prisma.favourites.create({
    data
  });
};

//Un-favourite a list for a user (i.e. delete record)
async function deleteFavourite (data: Favourite) {
  return await prisma.favourites.delete({
    where: {
      userId_listingId: {
        userId: data.userId,
        listingId: data.listingId
      }
    }
  });
};

// async function deleteFavourite (userId: User['id'], listingId: Listing['id']) {
//   return await prisma.favourites.delete({
//     where: {
//         userId: userId,
//         listingId: listingId
//       }
//     }
//   );
// };


// Get a list of property Ids a user has favourited
async function getFavouritesByUserId (id: Favourite['userId']) {
  return await prisma.favourites.findMany({
    where: { userId: id },
    select: { listingId: true }
  });
};

// Get a list of Users that have favourited a property
async function getFavouritesByListingId (id: Favourite['listingId']) {
  return await prisma.favourites.findMany({
    where: { listingId: id },
    select: { userId: true }
  });
};

// Get the number of times a property has been favourited
async function countFavouritesByListingId (id: Favourite['listingId']) {
  return await prisma.favourites.count({
    where: { listingId: id }
  });
};

// Export the CRUD operations
export {
  addFavourite,
  deleteFavourite,
  getFavouritesByUserId,
  getFavouritesByListingId,
  countFavouritesByListingId
};
