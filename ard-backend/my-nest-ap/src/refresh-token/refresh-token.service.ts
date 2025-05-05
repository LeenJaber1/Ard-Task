import { Injectable, NotFoundException } from '@nestjs/common';
import { RefreshToken } from './refresh-token-schema/refresh-token-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
  ) {}

  async saveRefreshToken(userEmail: string) {
    const refreshToken = await this.refreshTokenModel.create({
      email: userEmail,
    });
    return refreshToken;
  }

  async deleteRefreshToken(userEmail: string) {
    await this.refreshTokenModel.deleteOne({ email: userEmail });
  }

  async getRefreshToken(userEmail: string) {
    const refreshToken = await this.refreshTokenModel.findOne({
      email: userEmail,
    });
    if (!refreshToken) {
      throw new NotFoundException('user has no refresh tokens');
    }
    return refreshToken;
  }
}
