export interface Message {
  // flat data fields
  id: number;
  content: string;

  // datetime boilerplate
  createdAt: Date;
  updatedAt: Date;

  // foreign keys
  chatId: number;
  authorId: number;
}
