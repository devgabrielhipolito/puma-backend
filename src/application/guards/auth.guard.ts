import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers!.authorization?.split(' ') ?? [];

    if (type != 'Bearer' || !token) {
      throw new UnauthorizedException('Token não fornecido ou inválido');
    }

    try {
      const payload = await this.jwtService.signAsync(token);

      request['user'] = payload;
      
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
}
