import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Attribute } from './attribute.interface';

@Injectable()
export class AttributeModel {
  constructor(
    @InjectModel('Attribute') private readonly attributeModel: Model<Attribute>,
  ) {}
}
