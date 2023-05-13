// Import Prisma
const { PrismaClient } = require('@prisma/client');
let prisma = new PrismaClient();

// Function to delete all records in table, with table and tableName (string) arguments
async function deleteRecords (table, tableName) {
  try {
    await table.deleteMany({});
    console.log(`All records in ${tableName} table deleted.`);
  } catch (error) {
    console.log(`Error in deleting ${tableName} table:\n${error}`);
  }
};

// Deleting records for all tables, starting with most granular
deleteRecords(prisma.favourites, 'Favourites');
deleteRecords(prisma.image, 'Images');
deleteRecords(prisma.message, 'Messages');
deleteRecords(prisma.chat, 'Chats');
deleteRecords(prisma.listing, 'Listings');
deleteRecords(prisma.user, 'Users');
