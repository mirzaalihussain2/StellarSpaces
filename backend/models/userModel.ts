import { User } from '../interfaces/User';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// List of model functions
  // (1) Create a new user - return success status + full record of newly created user
  // (2) Get all users (INCLUDING soft-deleted users) - return full user record
  // (3) Get all users (EXCLUDING soft-deleted users) - return full user record
  // (4) Get user by Id (NOT soft-deleted) - cannot get soft-deleted users by user.Id (because user.Id = NULL)
  // (5) Update user by Id (NOT soft-deleted) - cannot get soft-deleted users by user.Id (because user.Id = NULL)
  // (6) Soft-delete user by user.Id
  // (7) Hard-delete user by user.Id (user has not been previously soft-deleted)
  // Hard-delete users / records that have been soft-deleted - i.e. clean up database.


// (1) Create a new user // tested by MAH @ 10 May, 3:50pm. WORKING
async function createUser(data: User) {
  return await prisma.user.create({
    data
  });
}

// (2) Get all users (INCLUDING soft-deleted users) // tested by MAH @ 10 May, 3:50pm. WORKING
async function getUsers() {
  return await prisma.user.findMany();
}

// (3) Get all users (EXCLUDING soft-deleted users)

// (4) Get a user by Id (NOT soft-deleted) // tested by MAH @ 10 May, 3:50pm. WORKING
async function getUserById(id: User['id']) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

// (5) Update a user by ID // tested by MAH @ 10 May, 3:50pm. WORKING
async function updateUser(id: User['id'], data: User) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data
  });
}

// // Soft delete a user by ID
// async function softDeleteUser(id: User['id']) {
//   const user = await prisma.user.update({
//     where: { id: id },
//     data: {
//       deletedAt: new Date(),
//       listings: {
//         updateMany: {
//           data: { deletedAt: new Date() },
//           where: { deletedAt: null },
//         },
//       },

//       tenantChats: {
//         updateMany: {
//           data: { deletedAt: new Date() },
//           where: { deletedAt: null },
//         },
//       },
//       landlordChats: {
//         updateMany: {
//           data: { deletedAt: new Date() },
//           where: { deletedAt: null },
//         },
//       },
//       favourites: {
//         updateMany: {
//           data: { deletedAt: new Date() },
//           where: { deletedAt: null },
//         },
//       },
//       messages: {
//         updateMany: {
//           data: { deletedAt: new Date() },
//           where: { deletedAt: null },
//         },
//       },
//     },
//   });
//   return user;
// }

// Delete a user by ID
async function hardDeleteUser(id: User['id']) {
  const user = await prisma.user.delete({
    where: { id: id },
  });
  return user;
}

// Export the CRUD operations
export {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  // softDeleteUser,
  hardDeleteUser
};
