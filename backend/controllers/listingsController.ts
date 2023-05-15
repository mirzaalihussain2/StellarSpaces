import {
  createListing,
  getListings,
  getListingById,
  // userQuery,
  updateListing,
  hardDeleteListing,
  queryObject,
} from '../models/listingsModel';

import { status, propertyTypes } from '../interfaces/Listing';
console.log(status);
console.log(Array.isArray(status));

import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/User';
// Create a new listing
async function createListings(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as User;
    const newListing = await createListing(user.id, req.body);
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
}

function generateQueryObj(userQuery: queryObject) {
  let queryObj: queryObject = {
    priceMin: userQuery.priceMin || 0,
    priceMax: userQuery.priceMax || 1000000000,
    numOfBedroomsMin: userQuery.numOfBedroomsMin || 0,
    numOfBedroomsMax: userQuery.numOfBedroomsMax || 1000000,
    numOfBathroomsMin: userQuery.numOfBathroomsMin || 0,
    numOfBathroomsMax: userQuery.numOfBathroomsMax || 1000000,
    petsAllowed: userQuery.petsAllowed.length ? userQuery.petsAllowed : [0, 1],
    hasGarage: userQuery.hasGarage.length ? userQuery.hasGarage : [0, 1],
    propertyType: userQuery.propertyType.length
      ? userQuery.propertyType
      : [
          'studio flat',
          'bedsit',
          'detached',
          'semi-detached',
          'terrace',
          'bungalow',
          'end terrace',
          'flat',
          'penthouse',
          'maisonette',
          'mobile home',
          'house boat',
        ],
    status: userQuery.status.length
      ? userQuery.status
      : ['live', 'dormant', 'let agreed', 'draft'],
  };
  return queryObj;
}

// Get all listings
async function fetchListings(req: Request, res: Response, next: NextFunction) {
  try {
    const userQuery = generateQueryObj(req.body);
    console.log(userQuery);
    const listings = await getListings(userQuery);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}

// Get a listing by ID
async function getListingsById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const listingId = parseInt(req.params.id);
    const listing = await getListingById(listingId);
    if (!listing) {
      res.status(404).json({ message: 'Listing not found' });
    } else {
      res.status(200).json(listing);
    }
  } catch (error) {
    next(error);
  }
}

// Update a listing by ID
async function updateListings(req: Request, res: Response, next: NextFunction) {
  try {
    const listingId = parseInt(req.params.id);
    const updatedListing = await updateListing(listingId, req.body);
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
}

// // Soft delete a listing by ID
// async function softDeleteListings(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const listingId = parseInt(req.params.id);
//     const listing = await softDeleteListing(listingId);

//     if (!listing) {
//       res.status(404).json({ message: 'User not found' });
//     } else {
//       res.status(200).json({ message: 'User soft-deleted successfully' });
//     }
//   } catch (error) {
//     next(error);
//   }
// }

// Hard delete a listing by ID
async function hardDeleteListings(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const listingId = parseInt(req.params.id);
    await hardDeleteListing(listingId);
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// Export the controller functions
export {
  createListings,
  fetchListings,
  getListingsById,
  updateListings,
  hardDeleteListings,
};
