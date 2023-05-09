import { User } from '../interfaces/User';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Create a new user
async function createUser(data: User) {
  return await prisma.user.create({
    data,
  });
}

// Get all users
async function getUsers() {
  return await prisma.user.findMany();
}

// Get a user by ID
async function getUserById(id: User['id']) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

// Update a user by ID
async function updateUser(id: User['id'], data: User) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });
}

// Soft delete a user by ID
async function softDeleteUser(id: User['id']) {
  const user = await prisma.user.update({
    where: { id: id },
    data: {
      deletedAt: new Date(),
      Listing: {
        updateMany: {
          data: { deletedAt: new Date() },
          where: { deletedAt: null },
        },
      },

      TenantChats: {
        updateMany: {
          data: { deletedAt: new Date() },
          where: { deletedAt: null },
        },
      },
      LandlordChats: {
        updateMany: {
          data: { deletedAt: new Date() },
          where: { deletedAt: null },
        },
      },
      Favourites: {
        updateMany: {
          data: { deletedAt: new Date() },
          where: { deletedAt: null },
        },
      },
      Message: {
        updateMany: {
          data: { deletedAt: new Date() },
          where: { deletedAt: null },
        },
      },
    },
  });
  return user;
}

// Delete a user by ID
async function hardDeleteUser(id: User['id']) {
  const user = await prisma.user.delete({
    where: { id: id },
    include: {
      Listing: true,
      TenantChats: true,
      LandlordChats: true,
      Favourites: true,
      Message: true,
    },
  });
  return user;
}

// Export the CRUD operations
export {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  hardDeleteUser,
};
