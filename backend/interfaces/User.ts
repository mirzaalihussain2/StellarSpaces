export interface User {
  // flat data fields
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  DOB: Date;

  // datetime boilerplate
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  // foreign keys
}
