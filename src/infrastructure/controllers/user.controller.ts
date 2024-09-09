import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { AuthUserDto } from 'src/application/dtos/user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() body: AuthUserDto) {
    const { username, password } = body;
    return this.userService.registerUser({
      username,
      password,
    });
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: AuthUserDto) {
    const { username, password } = body;
    return this.userService.loginUser({ username, password });
  }
}
