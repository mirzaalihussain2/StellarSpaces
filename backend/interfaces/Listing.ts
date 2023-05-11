const propertyTypes = [
  'studio flat',
  'bedsit',
  'detached',
  'semi-detached',
  'terrace',
  'bungalow',
  'end terrace',
  'flat',
  'penthouse',
  'maisonette',
  'mobile home',
  'house boat'
] as const;

type PropertyType = typeof propertyTypes[number];

export interface Listing {
  // flat data fields
  id: number;
  title: string;
  description: string;
  video?: string;
  propertyType: PropertyType;
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

  // foreign keys
  userId: number;
}
