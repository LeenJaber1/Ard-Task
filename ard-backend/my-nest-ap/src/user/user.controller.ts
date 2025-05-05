import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() createUserDTO: CreateUserDto) {
    return this.userService.createUser(createUserDTO);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Put('update-location')
  updateLocation(
    @Body() updateUserDTO: UpdateUserDto,
    @Req() request: Request,
  ) {
    const userEmail = (request.user as { userEmail: string }).userEmail;
    return this.userService.updateLocation(updateUserDTO, userEmail);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Get('location')
  getLocation(@Req() request: Request) {
    const userEmail = (request.user as { userEmail: string }).userEmail;
    return this.userService.getUserLocation(userEmail);
  }
}
