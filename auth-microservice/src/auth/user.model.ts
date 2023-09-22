import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserModel {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
}
