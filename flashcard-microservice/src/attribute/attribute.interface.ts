import { Document } from 'mongoose';

export interface Attribute extends Document {
  question: string;
  answer: string;
  interval: number;
  status: string;
  hashedUserId: string;
  lastReviewedAt: Date;
}
