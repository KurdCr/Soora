import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateFlashcardDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['again', 'easy', 'hard'])
  status: 'again' | 'easy' | 'hard';
}

export class UpdateFlashcardDto {
  @IsString()
  @IsOptional()
  question?: string;

  @IsString()
  @IsOptional()
  answer?: string;

  @IsString()
  @IsEnum(['again', 'easy', 'hard'])
  @IsOptional()
  status?: 'again' | 'easy' | 'hard';
}
