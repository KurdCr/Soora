import { Module } from '@nestjs/common';
import { FlashcardController } from './flashcard.controller';
import { FlashcardService } from './flashcard.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FlashcardSchema } from './flashcard.schema';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'Flashcard', schema: FlashcardSchema }]),
  ],
  controllers: [FlashcardController],
  providers: [FlashcardService, MongooseModule],
})
export class FlashcardModule {}
