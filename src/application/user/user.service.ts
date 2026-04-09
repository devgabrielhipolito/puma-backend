import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return this.userRepository.createUser({
        ...user,
        password: hashedPassword,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findUserByEmail(email);
  }
}
