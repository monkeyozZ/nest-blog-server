import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tag extends Document {
  @Prop({ unique: true })
  name: string

  @Prop({ unique: true })
  alias: string

  @Prop({ default: Date.now })
  creat_time: string;

}

export const TagSchema = SchemaFactory.createForClass(Tag);