import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // either city or coordinates string =  lat,long
  @Prop({ required: false })
  location: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
