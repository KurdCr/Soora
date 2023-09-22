import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttributeDto, UpdateAttributeDto } from './attribute.dto';

@Injectable()
export class AttributeService {
  constructor(
    @InjectModel('Attribute') private readonly attributeModel: Model<any>,
  ) {}

  async create(createAttributeDto: CreateAttributeDto): Promise<any> {
    const createdAttribute = new this.attributeModel(createAttributeDto);
    return createdAttribute.save();
  }

  async findAll(): Promise<any[]> {
    return this.attributeModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.attributeModel.findById(id).exec();
  }

  async update(
    id: string,
    updateAttributeDto: UpdateAttributeDto,
  ): Promise<any> {
    return this.attributeModel.findByIdAndUpdate(id, updateAttributeDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<any> {
    return this.attributeModel.findByIdAndRemove(id);
  }
}
