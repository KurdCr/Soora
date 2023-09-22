import {
  Injectable,
  NotFoundException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Flashcard } from './flashcard.interface';
import { CreateFlashcardDto, UpdateFlashcardDto } from './flashcard.dto';
import * as crypto from 'crypto';
import { JwtAuthService } from '../auth/jwt.service';
@Injectable()
export class FlashcardService {
  constructor(
    @InjectModel('Flashcard') private readonly flashcardModel: Model<Flashcard>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  intervalMap: { [key: string]: number } = {
    again: 30,
    easy: 60,
    hard: 120,
  };

  async generateShareableLink(@Req() request: Request) {
    const host = request.headers['host']; // Get the host (including port if available)
    // For now, it returns `localhost:3002`, but in production environment, we could hard code the `host url` in the'.env' file
    const token = this.jwtAuthService.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const { userId } = this.jwtAuthService.decodeJwt(token); // Decode the JWT and extract userId
    const hashedUserId = crypto
      .createHash('sha256')
      .update(userId)
      .digest('hex');
    const shareableLink = `${host}/flashcards/share/${hashedUserId}`;
    return shareableLink;
  }

  async createFlashcard(
    @Req() request: Request,
    createFlashcardDto: CreateFlashcardDto,
  ): Promise<Flashcard> {
    const token = this.jwtAuthService.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const { userId } = this.jwtAuthService.decodeJwt(token); // Decode the JWT and extract userId

    const hashedUserId = crypto
      .createHash('sha256')
      .update(userId)
      .digest('hex');
    const dtoWithHashedUserId = {
      ...createFlashcardDto,
      hashedUserId: hashedUserId,
    };
    const createdFlashcard = new this.flashcardModel(dtoWithHashedUserId);
    return createdFlashcard.save();
  }

  async getAllFlashcards(): Promise<Flashcard[]> {
    return this.flashcardModel.find().exec();
  }

  async getFlashcardById(id: string): Promise<Flashcard> {
    const flashcard = await this.flashcardModel.findById(id).exec();
    if (!flashcard) {
      throw new NotFoundException('Flashcard not found');
    }
    return flashcard;
  }

  async updateFlashcard(
    id: string,
    updateFlashcardDto: UpdateFlashcardDto,
  ): Promise<Flashcard> {
    try {
      const flashcard = await this.getFlashcardById(id);

      if (updateFlashcardDto.question) {
        flashcard.question = updateFlashcardDto.question;
      }
      if (updateFlashcardDto.answer) {
        flashcard.answer = updateFlashcardDto.answer;
      }
      if (updateFlashcardDto.status) {
        flashcard.status = updateFlashcardDto.status;
        const currentDate = new Date();
        flashcard.nextReviewAt = new Date(
          currentDate.getTime() +
            this.intervalMap[updateFlashcardDto.status] * 1000,
        );
      }

      await flashcard.save();

      return flashcard;
    } catch (error) {
      throw error;
    }
  }

  async deleteFlashcard(id: string): Promise<void> {
    const flashcard = await this.getFlashcardById(id);
    await flashcard.deleteOne();
  }

  async associateAttributes(
    flashcardId: string,
    attributeIds: string[],
  ): Promise<any> {
    return this.flashcardModel.findByIdAndUpdate(
      flashcardId,
      { $addToSet: { attributes: { $each: attributeIds } } },
      { new: true },
    );
  }

  async disassociateAttributes(
    flashcardId: string,
    attributeIds: string[],
  ): Promise<any> {
    return this.flashcardModel.findByIdAndUpdate(
      flashcardId,
      { $pullAll: { attributes: attributeIds } },
      { new: true },
    );
  }

  async getFlashcardsByAttribute(attributeId: string): Promise<any[]> {
    return this.flashcardModel.find({ attributes: attributeId }).exec();
  }

  async getFlashcardsByHash(hash: string): Promise<Flashcard[]> {
    try {
      const flashcards = await this.flashcardModel
        .find({ hashedUserId: hash })
        .exec();
      return flashcards;
    } catch (error) {
      throw new Error('Failed to fetch flashcards by user');
    }
  }

  async getVisibleFlashcards(userId: string): Promise<Flashcard[]> {
    try {
      const hashedUserId = crypto
        .createHash('sha256')
        .update(userId)
        .digest('hex');
      const flashcards = await this.flashcardModel
        .find({ hashedUserId })
        .exec();
      const currentDate = new Date();
      const visibleFlashcards = flashcards.filter((flashcard) => {
        return currentDate >= flashcard.nextReviewAt;
      });

      return visibleFlashcards;
    } catch (error) {
      throw new Error('Failed to fetch visible flashcards');
    }
  }
}
