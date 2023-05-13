// ImageController.ts
import { Request, Response, NextFunction } from 'express';
import { createImage, deleteImage } from '../models/imageModel';

async function create(req: Request, res: Response, next: NextFunction) {
  const { url, listingId } = req.body;

  try {
    const newImage = await createImage(url, listingId);
    res.status(201).json(newImage);
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    await deleteImage(parseInt(id));
    res.status(204).json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export { create, remove };