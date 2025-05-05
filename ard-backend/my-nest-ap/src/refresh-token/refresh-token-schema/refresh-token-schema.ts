import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class RefreshToken {
  @Prop()
  email: string;
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
