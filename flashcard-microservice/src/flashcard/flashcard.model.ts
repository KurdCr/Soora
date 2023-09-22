import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Flashcard } from './flashcard.interface';

@Injectable()
export class FlashcardModel {
  constructor(
    @InjectModel('Flashcard') private readonly flashcardModel: Model<Flashcard>,
  ) {}
}
