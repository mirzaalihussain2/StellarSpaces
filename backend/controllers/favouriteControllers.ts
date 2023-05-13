// Local
import {
  addFavourite,
  deleteFavourite,
  getFavouritesByUserId,
  getFavouritesByListingId,
  countFavouritesByListingId
} from '../models/favouritesModel';

// Global imports
import { NextFunction, Request, Response } from 'express';

// Add favourite (create record in favourite table)
async function addFavourites (req: Request, res: Response, next: NextFunction) {
  try {
    const favouriteRecord = await addFavourite(req.body);
    res.status(201).json(favouriteRecord);
  } catch (error) {
    next(error);
  }
};

// Remove favourite (delete DB record)
async function deleteFavourites (req: Request, res: Response, next: NextFunction) {
  try {
    await deleteFavourite(req.body);
    res.status(200).json({ message: 'Favourite deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get a list of user's favourited properties (IDs only)
async function getUserFavourites (req: Request, res: Response, next: NextFunction) {
  try {
    const listingsArray = await getFavouritesByUserId(parseInt(req.params.id));
    res.status(200).json(listingsArray);
  } catch (error) {
    next(error)
  }
}

async function getListingFavourites (req: Request, res: Response, next: NextFunction) {
  try {
    const userIdArray = await getFavouritesByListingId(parseInt(req.params.id));
    res.status(200).json(userIdArray);
  } catch (error) {
    next(error)
  }
};

async function countListingFavourites (req: Request, res: Response, next: NextFunction) {
  try {
    const count = await countFavouritesByListingId(parseInt(req.params.id));
    res.status(200).json(count);
  } catch (error) {
    next(error)
  }
};

// Export the controller functions
export {
  addFavourites,
  deleteFavourites,
  getUserFavourites,
  getListingFavourites,
  countListingFavourites
};