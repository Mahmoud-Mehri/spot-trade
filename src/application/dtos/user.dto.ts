import { IsNotEmpty, IsString } from 'class-validator';

// DTO for user authentication (Signup and login)
export class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
