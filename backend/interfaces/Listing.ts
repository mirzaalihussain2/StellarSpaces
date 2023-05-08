import { Image } from './Image';
import { Chat } from './Chat';
import { User } from './User';
import { Favourites } from './Favourite';

export interface Listing {
  id: number;
  title: string;
  description: string;
  video?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  petsAllowed: boolean;
  hasGarage: boolean;
  floor?: number;
  addressNo: number;
  streetName: string;
  postCode: string;
  city: string;
  county: string;
  latitude?: number;
  longitude?: number;
  deletedAt?: Date;
  userId: number;
  status: string;
  user: User;
  favourites: Favourites[];
  chats: Chat[];
  images: Image[];
}
