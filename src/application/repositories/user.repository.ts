import { Injectable } from '@nestjs/common';
import { User } from 'src/domains/user/models';
import { IUserRepository } from 'src/domains/user/repository.intf';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor() {}

  async newUser(userInfo: User): Promise<User> {
    // Create a new user and store in DB, then return the newly created user
    const user = new User('123', userInfo.username, userInfo.password);
    return Promise.resolve(user);
  }

  async findById(id: string): Promise<User | null> {
    // Find user by id in DB and return the result, used in Register and also Authentication
    return Promise.resolve(null);
  }

  async findByUsername(uname: string): Promise<User | null> {
    // Find user by username in DB and return the result, used in Login
    return Promise.resolve(null);
  }
}
