// Import Prisma
const { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();

// // Empty favourites table
// async function deleteAllFavourites () {
//   await prisma.favourites.deleteMany({});
//   const successMsg = `All favourites successfully deleted`;
//   console.log(successMsg);
//   res.status(200).json({message: successMsg});
// };

// // Empty images table
// async function deleteAllImages () {
//   await prisma.images.deleteMany({});
//   const successMsg = `All favourites successfully deleted`;
//   console.log(successMsg);
//   res.status(200).json({message: successMsg});
// };

// // Empty users table
// async function deleteAllUsers () {
//   await prisma.user.deleteMany({});
//   const successMsg = `All users successfully deleted`;
//   console.log(successMsg);
//   // res.status(200).json({message: successMsg});
// };

async function deleteRecords (table, tableName) {
  try {
    await table.deleteMany({});
    console.log(`All ${tableName} successfully deleted`);
  } catch (error) {
    console.log(`Error in deleting ${tableName} table:\n${error}`);
  }
};

// Deleting records for
deleteRecords(prisma.favourites, 'Favourites');
deleteRecords(prisma.image, 'Images');
deleteRecords(prisma.message, 'Messages');
deleteRecords(prisma.chat, 'Chats');
deleteRecords(prisma.listing, 'Listings');
deleteRecords(prisma.user, 'Users');



