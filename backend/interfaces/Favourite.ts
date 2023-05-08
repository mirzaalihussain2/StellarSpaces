import { Listing } from './Listing';
import { User } from './User';

export interface Favourites {
  id: number;
  user: User;
  userId: number;
  listing: Listing;
  listingId: number;
  deletedAt?: Date;
}
