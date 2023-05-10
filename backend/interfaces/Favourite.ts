export interface Favourites {
  // datetime boilerplate
  createdAt: Date;

  // foreign keys
  userId: number;
  listingId: number;

  // flat data fields
}