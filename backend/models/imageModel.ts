import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createImage(url: string, listingId: number) {
  return await prisma.image.create({
    data: {
      url,
      listingId,
    },
  });
}

async function deleteImage(id: number) {
  return await prisma.image.delete({
    where: {
      id,
    },
  });
}

export { createImage, deleteImage };
