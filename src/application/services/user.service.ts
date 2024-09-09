import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/domains/user/models';
import { IUserRepository } from 'src/domains/user/repository.intf';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from '../dtos/user.dto';
import { ServiceResponse } from 'src/common/types';

@Injectable()
export class UserService {
  private readonly hashSecretString: string;
  private readonly jwtSecretString: string;

  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.hashSecretString =
      this.configService.get<string>('HASH_SECRET') || 'DEFAULT_HASH_SECRET';

    this.jwtSecretString =
      this.configService.get<string>('JWT_SECRET') || 'DEFAULT_JWT_SECRET';
  }

  async registerUser(data: AuthUserDto): Promise<ServiceResponse> {
    const existingUser = await this.userRepository.findByUsername(
      data.username,
    );
    if (existingUser) {
      throw new ConflictException('User is already exists');
    }

    const hashedPassword = await bcrypt.hash(
      data.password + this.hashSecretString,
      10,
    );

    try {
      await this.userRepository.newUser({
        username: data.username,
        password: hashedPassword,
      });

      return new ServiceResponse(true, null);
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async loginUser(data: AuthUserDto): Promise<ServiceResponse> {
    const user = await this.userRepository.findByUsername(data.username);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    if (!this.validatePassword(data.password, user.password)) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const jwtPayload = { username: user.username, userId: user.id };
    const jwtToken = this.jwtService.sign(jwtPayload, {
      secret: this.jwtSecretString,
    });

    return new ServiceResponse(true, { token: jwtToken });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(
      password + this.hashSecretString,
      hashedPassword,
    );
  }
}
