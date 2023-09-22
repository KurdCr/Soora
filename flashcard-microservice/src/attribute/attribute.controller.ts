import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto, UpdateAttributeDto } from './attribute.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('attributes')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAttributeDto: CreateAttributeDto): Promise<any> {
    return this.attributeService.create(createAttributeDto);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.attributeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.attributeService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ): Promise<any> {
    return this.attributeService.update(id, updateAttributeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.attributeService.remove(id);
  }
}
