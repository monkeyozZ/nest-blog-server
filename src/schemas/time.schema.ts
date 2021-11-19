import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Time extends Document {
  @Prop()
  content: string

  @Prop()
  imageUrl: string

  @Prop()
  status: boolean

  @Prop({ default: false })
  recovery: boolean

  @Prop({ default: Date.now })
  createTime: string;

}

export const TimeSchema = SchemaFactory.createForClass(Time);