import {
  createListing,
  getListings,
  getListingById,
  // userQuery,
  updateListing,
  hardDeleteListing
} from '../models/listingsModel';

import { NextFunction, Request, Response } from 'express';
// Create a new listing
async function createListings(req: Request, res: Response, next: NextFunction) {
  try {
    const newListing = await createListing(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
}

// Get all listings
async function fetchListings(req: Request, res: Response, next: NextFunction) {
  try {
    const userQuery = req.body
    console.log(userQuery)
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
