import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user-schema/user-schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { comparePasswords, hashPassword } from 'src/util/hash-helper.util';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async createUser(createUser: CreateUserDto) {
    const existingUser = await this.userModel
      .findOne({ email: createUser.email })
      .exec();

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await hashPassword(createUser.password);

    return this.userModel.create({
      ...createUser,
      password: hashedPassword,
    });
  }

  async updateLocation(updateUserDto: UpdateUserDto, email: string) {
    const user = await this.getUser(email);
    user.location = updateUserDto.location;
    return await user.save();
  }

  async verifyUser(email: string, password: string) {
    const user = await this.getUser(email);
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('wrong credentials');
    }
  }

  async getUserLocation(email: string) {
    const user = await this.getUser(email);
    if (user.location) {
      return user.location;
    }
    throw new NotFoundException();
  }
}
