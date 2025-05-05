import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { RequestWithAccessToken } from 'src/interfaces/jwt-interface';
import { JwtPayload } from 'src/interfaces/jwt-interface';
@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        const typedReq = req as RequestWithAccessToken;
        if (
          !typedReq.cookies ||
          typeof typedReq.cookies.access_token !== 'string'
        ) {
          throw new UnauthorizedException('Access token missing or invalid.');
        }

        return typedReq.cookies.access_token;
      },
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!,
    });
  }

  validate(payload: JwtPayload) {
    return { userEmail: payload.sub };
  }
}
