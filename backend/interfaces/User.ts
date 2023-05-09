import { Listing } from './Listing';
import { Favourites } from './Favourite';
import { Chat } from './Chat';
import { Message } from './Message';

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  DOB: Date;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  listing: Listing[];
  favourites: Favourites[];
  landlordChats: Chat[];
  tenantChats: Chat[];
  messages: Message[];
}
