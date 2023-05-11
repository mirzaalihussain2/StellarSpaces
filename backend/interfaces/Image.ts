export interface Image {
  // flat data fields
  id: number;
  url: string;

  // datetime boilerplate
  createdAt: Date;
  updatedAt: Date;

  // foreign keys
  listingId: number;
}
