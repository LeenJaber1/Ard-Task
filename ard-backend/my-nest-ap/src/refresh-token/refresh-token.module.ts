import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshTokenSchema,
  RefreshToken,
} from './refresh-token-schema/refresh-token-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  exports: [RefreshTokenService],
  providers: [RefreshTokenService],
})
export class RefreshTokenModule {}
