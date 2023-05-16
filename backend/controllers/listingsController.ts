import {
  createListing,
  getListings,
  getListingById,
  // userQuery,
  updateListing,
  hardDeleteListing,
  queryObject,
} from '../models/listingsModel';





import {status, propertyTypes, Listing} from '../interfaces/Listing';
import { User } from '../interfaces/User';

import { NextFunction, Request, Response } from 'express';
import {getSphericalDistance,getLatLng} from "./GoogleMapsAPI";

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
    petsAllowed: userQuery.petsAllowed ? [1] : [0, 1], 
    hasGarage: userQuery.hasGarage ? [1] : [0, 1],
    propertyType: (userQuery.propertyType).length ? userQuery.propertyType : [
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
      'house boat'
    ],
    status: (userQuery.status).length ? userQuery.status : ['live', 'dormant', 'let agreed', 'draft'],
    userId: userQuery.userId 
  };
 
  return queryObj;
}


async function filterBasedOnRadius(listings:Listing[],radius:string,centerPos:{lat:string,lng:string}){
  let filteredListings = []
  for(let listing of listings){
    
    const sphericalDistance =  getSphericalDistance( listing.addressLatitude as number,listing.addressLongitude as number,JSON.parse(centerPos.lat),JSON.parse(centerPos.lng ))
    // console.log(sphericalDistance)
    if (sphericalDistance<=JSON.parse(radius)) filteredListings.push(listing)
   
  }
  
  return filteredListings
}

function filterBasedOnScroll(page:number,perPage:number,listings:Listing[]){
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const filteredListings = listings.slice(startIndex, endIndex);
  return filteredListings
}


// Get all listings
async function fetchListings(req: Request, res: Response, next: NextFunction) {
  try {
    req.body.userId = parseInt(req.body.userId)
    const userQuery = generateQueryObj(req.body);
    // console.log(userQuery);
    const listings = await getListings(userQuery);
    const centerPos = await getLatLng(req.body.location)
    let filteredListings = await filterBasedOnRadius(listings as Listing[],req.body.radius,centerPos as {lat:string,lng:string})
    if(req.body.page){
        filteredListings = filterBasedOnScroll(req.body.page,req.body.perPage,filteredListings)
    }
    res.status(200).json(filteredListings);
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
