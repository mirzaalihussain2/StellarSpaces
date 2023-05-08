import { Listing } from './Listing';
import { Message } from './Message';
import { User } from './User';

export interface Chat {
  id: number;
  landlord: User;
  landlordId: number;
  tenant: User;
  tenantId: number;
  listing: Listing;
  listingId: number;
  messages: Message[];
  deletedAt?: Date;
}
