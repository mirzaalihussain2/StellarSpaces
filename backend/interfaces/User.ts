export interface User {
  // flat data fields
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  DOB: Date;
  //
  googleId?: string;
  // datetime boilerplate
  createdAt: Date;
  updatedAt: Date;

  // foreign keys
}
