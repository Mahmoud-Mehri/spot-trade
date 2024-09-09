import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { UserRepository } from './application/repositories/user.repository';
import { UserController } from './infrastructure/controllers/user.controller';

@Module({
  imports: [],
  providers: [
    UserService,
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
