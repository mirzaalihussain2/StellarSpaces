// Local
import {
  addFavourite
} from '../models/favouritesModel';

// Global imports
import { NextFunction, Request, Response } from 'express';

// Add favourite (create record in favourite table)
async function addFavourite (req: Request, res: Response, next: NextFunction) {
  try {
    const favouriteRecord = await addFavourite( );
    res.status(201).json(favouriteRecord);
  } catch (error) {
    next(error);
  }
};


