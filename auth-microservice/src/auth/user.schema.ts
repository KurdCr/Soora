import { Schema } from 'mongoose';
import { User } from './user.interface';

export const UserSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: String,
  password: String, // Hashed password
});
