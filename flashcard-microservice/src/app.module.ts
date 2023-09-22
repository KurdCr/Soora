import { Module } from '@nestjs/common';
import { FlashcardModule } from './flashcard/flashcard.module';
import { AttributeModule } from './attribute/attribute.module';

@Module({
  imports: [FlashcardModule, AttributeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
