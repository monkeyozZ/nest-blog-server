import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Login extends Document {
  @Prop()
  _id?: string;

  @Prop()
  username: string;

  @Prop()
  password: string | number;

}

export const LoginSchema = SchemaFactory.createForClass(Login);