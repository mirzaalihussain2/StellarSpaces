import { Chat } from './Chat';
import { User } from './User';

export interface Message {
  id: number;
  content: string;
  author: User;
  authorId: number;
  chat: Chat;
  chatId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
