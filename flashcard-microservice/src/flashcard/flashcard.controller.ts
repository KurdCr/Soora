import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { CreateFlashcardDto, UpdateFlashcardDto } from './flashcard.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('flashcards')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  createFlashcard(
    @Req() request: Request,
    @Body() createFlashcardDto: CreateFlashcardDto,
  ) {
    return this.flashcardService.createFlashcard(request, createFlashcardDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllFlashcards() {
    return this.flashcardService.getAllFlashcards();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getFlashcardById(@Param('id') id: string) {
    return this.flashcardService.getFlashcardById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  updateFlashcard(
    @Param('id') id: string,
    @Body() updateFlashcardDto: UpdateFlashcardDto,
  ) {
    return this.flashcardService.updateFlashcard(id, updateFlashcardDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteFlashcard(@Param('id') id: string) {
    return this.flashcardService.deleteFlashcard(id);
  }

  @Post(':flashcardId/associate-attributes')
  @UseGuards(JwtAuthGuard)
  async associateAttributes(
    @Param('flashcardId') flashcardId: string,
    @Body() body: { attributeIds: string[] },
  ): Promise<any> {
    const { attributeIds } = body;
    return this.flashcardService.associateAttributes(flashcardId, attributeIds);
  }

  @Post(':flashcardId/disassociate-attributes')
  @UseGuards(JwtAuthGuard)
  async disassociateAttributes(
    @Param('flashcardId') flashcardId: string,
    @Body() body: { attributeIds: string[] },
  ): Promise<any> {
    const { attributeIds } = body;
    return this.flashcardService.disassociateAttributes(
      flashcardId,
      attributeIds,
    );
  }

  @Get(':userId/visible')
  @UseGuards(JwtAuthGuard)
  async getVisibleFlashcards(@Param('userId') userId: string) {
    return this.flashcardService.getVisibleFlashcards(userId);
  }

  @Get('generate-shareable-link')
  @UseGuards(JwtAuthGuard)
  async generateShareableLink(@Req() request: Request): Promise<string> {
    const shareableLink =
      await this.flashcardService.generateShareableLink(request);
    return shareableLink;
  }

  @Get('share/:hash') // This endpoint is publicly accessible, allowing anyone with the link to use it without authentication.
  async getFlashcardsByHash(@Param('hash') hash: string) {
    const flashcards = await this.flashcardService.getFlashcardsByHash(hash);
    return flashcards;
  }

  @Get('attributes/:attributeId')
  @UseGuards(JwtAuthGuard)
  async getFlashcardsByAttribute(
    @Param('attributeId') attributeId: string,
  ): Promise<any[]> {
    return this.flashcardService.getFlashcardsByAttribute(attributeId);
  }
}
