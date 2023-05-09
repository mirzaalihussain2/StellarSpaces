import { Listing } from '../interfaces/Listing';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// Create a new listing
async function createListing(data: Listing) {
  const {
    title,
    description,
    video,
    price,
    bedrooms,
    bathrooms,
    petsAllowed,
    hasGarage,
    floor,
    addressNo,
    streetName,
    postCode,
    city,
    county,
    latitude,
    longitude,
    userId,
    status,
  } = data;
  return await prisma.listing.create({
    data: {
      title,
      description,
      video: video ?? '',
      price,
      bedrooms,
      bathrooms,
      petsAllowed,
      hasGarage,
      floor,
      addressNo,
      streetName,
      postCode,
      city,
      county,
      latitude,
      longitude,
      userId,
      status,
    },
  });
}

// Get all listings
async function getListings() {
  return await prisma.listing.findMany({
    where: {
      deletedAt: null,
    },
  });
}

// Get a listing by ID
async function getListingById(id: Listing['id']) {
  return await prisma.listing.findUnique({
    where: {
      id: id,
    },
  });
}

// Update a listing by ID
async function updateListing(id: Listing['id'], data: Partial<Listing>) {
  return await prisma.listing.update({
    where: {
      id: id,
    },
    data: {
      title: data.title,
      description: data.description,
      video: data.video ?? '',
      price: data.price,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      petsAllowed: data.petsAllowed,
      hasGarage: data.hasGarage,
      floor: data.floor,
      addressNo: data.addressNo,
      streetName: data.streetName,
      postCode: data.postCode,
      city: data.city,
      county: data.county,
      latitude: data.latitude,
      longitude: data.longitude,
      userId: data.userId,
      status: data.status,
    },
  });
}

// Soft delete a listing by ID
async function softDeleteListing(id: Listing['id']) {
  const listing = await prisma.listing.update({
    where: { id: id },
    data: {
      deletedAt: new Date(),
      images: {
        updateMany: {
          data: { deletedAt: new Date() },
          where: { deletedAt: null },
        },
      },
      favourites: {
        updateMany: {
          data: { deletedAt: new Date() },
          where: { deletedAt: null },
        },
      },
      chats: {
        updateMany: {
          data: { deletedAt: new Date() },
          where: { deletedAt: null },
        },
      },
    },
  });
  return listing;
}
// Hard delete a listing by ID
async function hardDeleteListing(id: Listing['id']) {
  const listing = await prisma.listing.delete({
    where: { id: id },
    include: {
      images: true,
      favourites: true,
      chats: true,
    },
  });
  return listing;
}

export {
  createListing,
  getListings,
  getListingById,
  updateListing,
  softDeleteListing,
  hardDeleteListing,
};
