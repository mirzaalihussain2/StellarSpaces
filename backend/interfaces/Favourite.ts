export interface Favourites {
  // datetime boilerplate
  createdAt: Date;
  deletedAt?: Date;

  // foreign keys
  userId: number;
  listingId: number;

  // flat data fields
}