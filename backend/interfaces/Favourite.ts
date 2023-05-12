export interface Favourite {
  // datetime boilerplate
  createdAt: Date;

  // foreign keys
  userId: number;
  listingId: number;

  // flat data fields
  // id: number;
};