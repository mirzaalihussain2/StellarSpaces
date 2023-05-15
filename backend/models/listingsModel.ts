// Local imports
import { Listing, PropertyType, Status } from '../interfaces/Listing';
import prisma from '../prisma/client';
import getLatLng from '../controllers/addressConverter';

// Defining type: queryObject
type queryObject = {
  priceMin?: number;
  priceMax?: number;
  numOfBedroomsMin?: number;
  numOfBedroomsMax?: number;
  numOfBathroomsMin?: number;
  numOfBathroomsMax?: number;
  petsAllowed: number[];
  hasGarage: number[];
  status: Status[];
  propertyType: PropertyType[];
};

// List of LISTING model functions
// (1) Create property listing associated with userId
// (2) Get a single property listing, by listing.id
// (3) Get all properties on site, with some filter criteria applied
// (4) Update a single property listing, by listing.id
// (5) Soft-delete listing by listing id
// (6) Hard-delete listing by listing id

// Create a new listing
async function createListing(data: Listing) {
  console.log(data);
  const address = `${data.addressHouseNum}, ${data.addressStreetName}, ${data.addressPostCode}`;
  const LatLngObj = await getLatLng(address);
  console.log(LatLngObj);
  if (LatLngObj) {
    data.addressLatitude = LatLngObj.lat;
    data.addressLongitude = LatLngObj.lng;
  }
  data.status = 'draft';
  data.title = `${data.numOfBedrooms} bedroom ${data.propertyType} in ${data.addressStreetName}`;
  return await prisma.listing.create({
    data,
  });
}

// query object, with type-safety, that can accept all filter params from front end
// could potentially use a platform config file to set defaults for these queries - bring back everything
// const userQuery: queryObject = {
//   priceMin: 100,
//   priceMax: 3500,
//   numOfBedroomsMin: 1,
//   numOfBedroomsMax: 5,
//   numOfBathroomsMin: 1,
//   numOfBathroomsMax: 5,
//   petsAllowed: [0], // false is actually true OR false
//   hasGarage: [1], // false is actually true OR false
//   status: ['dormant', 'live', 'let agreed'],
//   propertyType: ['flat', 'bungalow', 'terrace']
// };

// Get all listings
async function getListings(userQuery: queryObject) {
  return await prisma.listing.findMany({
    where: {
      price: {
        gte: userQuery.priceMin,
        lte: userQuery.priceMax,
      },
      numOfBedrooms: {
        gte: userQuery.numOfBedroomsMin,
        lte: userQuery.numOfBedroomsMax,
      },
      numOfBathrooms: {
        gte: userQuery.numOfBathroomsMin,
        lte: userQuery.numOfBathroomsMax,
      },
      petsAllowed: { in: userQuery.petsAllowed }, // false => true OR false
      hasGarage: { in: userQuery.hasGarage }, // false => true OR false
      status: { in: userQuery.status },
      propertyType: { in: userQuery.propertyType },
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

async function updateListing(id: Listing['id'], data: Listing) {
  return await prisma.listing.update({
    where: { id: id },
    data,
  });
}

async function hardDeleteListing(id: Listing['id']) {
  return await prisma.listing.delete({
    where: { id: id },
  });
}

async function setListingAsFeatured(id: Listing['id']) {
  return await prisma.listing.update({
    where: {
      id: id,
    },
    data: {
      featured: true,
    },
  });
}
export {
  createListing,
  getListings,
  getListingById,
  // userQuery,
  updateListing,
  hardDeleteListing,
  setListingAsFeatured,
  queryObject,
};
