import { Controller, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private readonly accessExpiresIn: number;
  private readonly refreshExpiresIn: number;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
  ) {
    this.accessExpiresIn =
      Number(this.configService.get('JWT_ACCESS_TIME')) || 3600;

    this.refreshExpiresIn =
      Number(this.configService.get('JWT_REFRESH_TIME')) || 604800;
  }

  @Post('login')
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.userService.verifyUser(email, password);
    const { accessToken, refreshToken } =
      await this.authService.getLoginTokens(email);

    this.authService.createCookie(
      response,
      'refresh_token',
      refreshToken,
      this.refreshExpiresIn,
    );
    this.authService.createCookie(
      response,
      'access_token',
      accessToken,
      this.accessExpiresIn,
    );

    return 'logged in successfully';
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    // user email is placed in the request after successful validation of the tokens (either refresh or access) in the cookie
    const userEmail = (request.user as { userEmail: string }).userEmail;
    const { accessToken, refreshToken } =
      await this.authService.refresh(userEmail);
    this.authService.createCookie(
      response,
      'refresh_token',
      refreshToken,
      this.refreshExpiresIn,
    );
    this.authService.createCookie(
      response,
      'access_token',
      accessToken,
      this.accessExpiresIn,
    );
    return 'access and refresh tokens are refreshed';
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userEmail = (request.user as { userEmail: string }).userEmail;
    await this.authService.logout(userEmail);
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
    return 'Logged out';
  }
}
