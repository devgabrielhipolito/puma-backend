import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../database/models';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor() {}

  async createUser(user: CreateUserDto) {
    try {
      return User.create({
        ...user,
        created_at: new Date(),
        updated_at: new Date(),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findUserByEmail(email: string) {
    return await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password', 'image_url'],
    });
  }

  async updateUser(user: User) {
    return User.update(user, { where: { id: user.id } });
  }
}
