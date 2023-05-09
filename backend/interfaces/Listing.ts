export interface Listing {
  // flat data fields
  id: number;
  title: string;
  description: string;
  video?: string;
  price: number;
  numOfBedrooms: number;
  numOfBathrooms: number;
  petsAllowed: boolean;
  hasGarage: boolean;
  status: string;

  // address as flat data fields
  addressApartmentFloorNum?: number;
  addressHouseNum: number;
  addressStreetName: string;
  addressPostCode: string;
  addressCity: string;
  addressCounty: string;
  addressLongitude?: number;
  addressLatitude?: number;

  // datetime boilerplate
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  // foreign keys
  userId: number;
}
