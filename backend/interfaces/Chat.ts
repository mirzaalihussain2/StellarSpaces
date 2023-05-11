export interface Chat {
  // flat data fields
  id: number;

  // datetime boilerplate
  createdAt: Date;
  updatedAt: Date;

  // foreign keys
  listingId: number;
  landlordId: number;
  tenantId: number;
}
