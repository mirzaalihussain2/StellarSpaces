export interface Message {
  // flat data fields
  id: number;
  content: string;

  // datetime boilerplate
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  // foreign keys
  chatId: number;
  authorId: number;
}
