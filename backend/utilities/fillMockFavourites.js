// Import Prisma
const { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();

// List of user Ids
const userIds = [
  200,
  201,
  202,
  203,
  204,
  205,
  206,
  207,
  208,
  230,
  231,
  232,
  233,
  234,
  235,
  236,
  237
];

// List of listing Ids
const listingIds = [
  103,
  104,
  105,
  106,
  107,
  108,
  109,
  112,
  113,
  114,
  115,
  116,
  117,
  118,
  119,
  122,
  123,
  124,
  125,
  126,
  127,
  128,
  129
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

function populateMockFavourites (mockFavourites, userId, arr) {
  let listingId = listingIds[getRandomInt(0, listingIds.length)];
  if (!arr.includes(listingId)) {
    mockFavourites.push({
      userId: userId,
      listingId: listingId
    });
  };
  arr.push(listingId);
};

function addFavesPerUser (mockFavourites, userIds) {
  for (let userId of userIds) {
    let arr = [];
    populateMockFavourites(mockFavourites, userId, arr);
    populateMockFavourites(mockFavourites, userId, arr);
    populateMockFavourites(mockFavourites, userId, arr);
  };
};

let mockFavourites = [];
addFavesPerUser(mockFavourites, userIds);

async function createMany (mockFavourites) {
  return await prisma.favourites.createMany({data: mockFavourites})
};

createMany(mockFavourites);
