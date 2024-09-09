import { User } from './models';

export interface IUserRepository {
  newUser(userInfo: Partial<User>): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByUsername(uname: string): Promise<User | null>;
}
