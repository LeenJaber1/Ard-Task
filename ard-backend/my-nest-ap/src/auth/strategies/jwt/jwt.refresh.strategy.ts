import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { RequestWithRefreshToken } from 'src/interfaces/jwt-interface';
import { JwtPayload } from 'src/interfaces/jwt-interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        const typedReq = req as RequestWithRefreshToken;
        if (
          !typedReq.cookies ||
          typeof typedReq.cookies.refresh_token !== 'string'
        ) {
          throw new UnauthorizedException('Refresh token missing or invalid.');
        }

        return typedReq.cookies.refresh_token;
      },
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET')!,
    });
  }
  validate(payload: JwtPayload) {
    return { userEmail: payload.sub };
  }
}
