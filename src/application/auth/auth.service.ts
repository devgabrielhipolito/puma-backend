import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginUserDto) {
    try {
      const user = await this.userService.findUserByEmail(data.email);
      if (!user) {
        throw new UnauthorizedException('Email ou senha inválido.');
      }
      const hashedPassword = user.get('password');

      const matchPassword = await compare(data.password, hashedPassword);

      if (!matchPassword) {
        throw new UnauthorizedException('Email ou senha inválido.');
      }

      const token = { sub: user.id, name: user.name, email: user.email };
      const access_token = await this.jwtService.signAsync(token, {
        algorithm: 'HS256',
      });

      return {
        access_token,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
