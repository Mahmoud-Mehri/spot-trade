import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const authHeader = request.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   throw new UnauthorizedException('Authentication Failed');
    // }

    // const token = authHeader.split(' ')[1];
    try {
      //   const info = this.jwtService.verify(token);
      request.user = { id: 123 };

      return true;
    } catch (err) {
      throw new UnauthorizedException('Authentication Failed');
    }
  }
}
