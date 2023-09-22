import { Document } from 'mongoose';

export interface Flashcard extends Document {
  question: string;
  answer: string;
  nextReviewAt: Date;
  status: 'again' | 'easy' | 'hard';
  hashedUserId: string;
  attributes: string[];
}
