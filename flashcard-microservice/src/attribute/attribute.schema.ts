import * as mongoose from 'mongoose';

export const AttributeSchema = new mongoose.Schema({
  name: String,
  description: String,
});
