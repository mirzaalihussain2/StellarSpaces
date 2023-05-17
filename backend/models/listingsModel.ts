// Local imports
import {Listing, PropertyType, Status} from '../interfaces/Listing';
import prisma from '../prisma/client';

import {getLatLng} from "../controllers/GoogleMapsAPI";
import {User} from '../interfaces/User';


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
    userId?: number;
};

type whereClause =
    {
        petsAllowed: {
            in:
                number[]
        };
        price: {
            gte: number | undefined;
            lte: number | undefined
        };
        propertyType: {
            in:
                PropertyType[]
        };
        numOfBedrooms: {
            gte: number | undefined;
            lte: number | undefined
        };
        numOfBathrooms: {
            gte: number | undefined;
            lte: number | undefined
        };
        hasGarage: {
            in:
                number[]
        };
        status: {
            in:
                Status[]
        }
        userId?:number
    }


// List of LISTING model functions
// (1) Create property listing associated with userId
// (2) Get a single property listing, by listing.id
// (3) Get all properties on site, with some filter criteria applied
// (4) Update a single property listing, by listing.id
// (5) Set listing as featured
// (6) Hard-delete listing by listing id
// (7) Get userId for property, using listing.Id

// (1) Create property listing associated with userId
async function createListing(userId: User['id'], data: Listing) {
    if (!userId) throw new Error('userId is required to create a listing');

    // console.log(data);
    const address = `${data.addressHouseNum}, ${data.addressStreetName}, ${data.addressPostCode}`;
    const LatLngObj = await getLatLng(address);
    // console.log(LatLngObj);
    if (LatLngObj) {
        data.addressLatitude = LatLngObj.lat;
        data.addressLongitude = LatLngObj.lng;
    }
    data.status = 'draft';
    data.title = `${data.numOfBedrooms} bedroom ${data.propertyType} in ${data.addressStreetName}`;

    // Include userId in the data passed to prisma.listing.create
    return await prisma.listing.create({
        data: {
            ...data,
            userId,
        },
    });
}

// query object, with type-safety, that can accept all filter params from front end
// // could potentially use a platform config file to set defaults for these queries - bring back everything
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

// (3) Get all properties on site, with some filter criteria applied
async function getListings(userQuery: queryObject) {
    const whereClause: whereClause= {
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
        petsAllowed: {in: userQuery.petsAllowed},
        hasGarage: {in: userQuery.hasGarage},
        status: {in: userQuery.status},
        propertyType: {in: userQuery.propertyType},
    };

    if (userQuery.userId as number) {

        whereClause.userId   = userQuery.userId as number
    }

    return await prisma.listing.findMany({
        where: whereClause,
    });
}

// (2) Get a single property listing, by listing.id
async function getListingById(id: Listing['id']) {
    return await prisma.listing.findUnique({
        where: {
            id: id,
        },
    });
}

// (4) Update a single property listing, by listing.id
async function updateListing(id: Listing['id'], data: Listing) {
    return await prisma.listing.update({
        where: {id: id},
        data,
    });
}

// (6) Hard-delete listing by listing id
async function hardDeleteListing(id: Listing['id']) {
    return await prisma.listing.delete({
        where: {id: id},
    });
}

// (5) Set listing as featured
async function setListingAsFeatured(id: Listing['id']) {
  return await prisma.listing.update({
    where: {
      id: id,
    },
    data: {
      featured: true,
    },
  });
};

// (7) Get userId for property, using listing.Id
async function getUserIdForListing (id: Listing['id']) {
  return await prisma.listing.findUniqueOrThrow({
    where: { id: id },
    select: { userId: true }
  });
};

export {
  createListing,
  getListings,
  getListingById,
  // userQuery,
  updateListing,
  hardDeleteListing,
  setListingAsFeatured,
  getUserIdForListing,
  queryObject
};
