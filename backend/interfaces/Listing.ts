export const propertyTypes = [
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

export type PropertyType = typeof propertyTypes[number];

export const status = [
    'live',
    'dormant',
    'let agreed',
    'draft'
] as const;

export type Status = typeof status[number];

// const boolArray = [0, 1] as const;
// export type Bool = typeof boolArray[number];

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
    petsAllowed: number;
    hasGarage: number;
    status: Status;
    featured: boolean;

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
