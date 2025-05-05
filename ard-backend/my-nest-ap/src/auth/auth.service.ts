import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RefreshTokenService } from 'src/refresh-token/refresh-token.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  private accessSecret: string;
  private refreshSecret: string;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private refreshService: RefreshTokenService,
    private configService: ConfigService,
  ) {
    this.accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET')!;
    this.refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET')!;
  }

  async getLoginTokens(email: string) {
    // just incase delete the previous refresh token so that user dont have duplicate
    await this.refreshService.deleteRefreshToken(email);
    const payload = { sub: email };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.accessSecret,
      expiresIn: '60m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      expiresIn: '7d',
    });
    await this.refreshService.saveRefreshToken(email);
    return { accessToken, refreshToken };
  }

  async refresh(email: string) {
    const user = await this.userService.getUser(email);
    await this.refreshService.deleteRefreshToken(email);
    return await this.getLoginTokens(user.email);
  }

  async logout(email: string) {
    await this.refreshService.deleteRefreshToken(email);
  }

  createCookie(res: Response, name: string, value: string, maxAge: number) {
    res.cookie(name, value, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      maxAge: maxAge,
      path: '/',
    });
  }
}
