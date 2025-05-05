import { Request } from 'express';

export interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

export interface RequestWithRefreshToken extends Request {
  cookies: {
    refresh_token?: string;
  };
}

export interface RequestWithAccessToken extends Request {
  cookies: {
    access_token?: string;
  };
}
