// Local imports
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  // softDeleteUser,
  hardDeleteUser
} from '../models/userModel';

// Global imports
import { NextFunction, Request, Response } from 'express';

// Create a new user
async function createUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

// Get all users
async function getAllUser(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

// Get a user by ID
async function getUsersById(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseInt(req.params.id);
    const user = await getUserById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
}

// Update a user by ID
async function updateUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = await updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

// Soft delete user by ID
async function softDeleteUsers(req: Request, res: Response, next: NextFunction) {
  req.body.id = 0;
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = await updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

// // Soft delete a user by ID
// async function softDeleteUsers(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const userId = parseInt(req.params.id);
//     const user = await softDeleteUser(userId);

//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//     } else {
//       res.status(200).json({ message: 'User soft-deleted successfully' });
//     }
//   } catch (error) {
//     next(error);
//   }
// }

// Hard delete a user by ID
async function hardDeleteUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = parseInt(req.params.id);
    await hardDeleteUser(userId);
    res.status(200).json({ message: 'User hard-deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// Export the controller functions
export {
  createUsers,
  getAllUser,
  getUsersById,
  updateUsers,
  softDeleteUsers,
  hardDeleteUsers
};
