import { Profile } from 'passport-google-oauth20';
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

import bcrypt from 'bcrypt';

async function findUserByEmail(email: User['email']) {
  return await prisma.user.findUnique({
    where: {
      email: email
    }
  })
};

// Create a new user
async function createUser(data: User) {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(data.password, salt);
  return await prisma.user.create({
    data: { ...data, password },
  });
}

// Authenticate a user with an email and password
async function loginUser(email: User['email'], password: User['password']) {
  // Find the user with the specified email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If no user is found with the email, return null
  if (!user) {
    return null;
  }

  // Verify that the password matches the stored password hash
  const passwordMatch = await bcrypt.compare(password, user.password);

  // If the password does not match, return null
  if (!passwordMatch) {
    return null;
  }

  // If the credentials are valid, return the user object
  return user;
}
//////////////////////////////////////////////////////

// Get a user by email
async function getUserByEmail(email: User['email']) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

// Create a user from Google profile

async function createUserFromGoogleProfile(profile: Profile) {
  const email =
    profile.emails && profile.emails[0] ? profile.emails[0].value : null;

  const userData = {
    email: email || '',
    password: '',
    firstName: profile._json.given_name || '',
    lastName: profile._json.family_name || '',
    DOB: new Date(),
    googleId: profile.id,
    displayName: profile.displayName || null,
  };

  const createdUser = await prisma.user.create({
    data: userData,
  });

  return createdUser;
}
// (1) Create a new user // tested by MAH @ 10 May, 3:50pm. WORKING
// async function createUser(data: User) {
//   return await prisma.user.create({
//     data,
//   });
// }

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
    data,
  });
}

// Delete a user by ID
async function hardDeleteUser(id: User['id']) {
  const user = await prisma.user.delete({
    where: { id: id },
  });
  return user;
}

// Export the CRUD operations
export {
  findUserByEmail,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  hardDeleteUser,
  loginUser,
  getUserByEmail,
  createUserFromGoogleProfile,
};
