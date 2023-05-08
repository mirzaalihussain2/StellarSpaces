import { Listing } from './Listing';

export interface Image {
  id: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  listingId: number;
  listing: Listing;
  deletedAt?: Date;
}
