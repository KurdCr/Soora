import * as mongoose from 'mongoose';

export const FlashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
  nextReviewAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['again', 'easy', 'hard'],
    default: 'easy',
  },
  hashedUserId: String, // User who owns the flashcard
  attributes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' }],
});
