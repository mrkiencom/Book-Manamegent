import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDTO } from './dto/CreateUser.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async createUser(info: createUserDTO): Promise<User> {
    return this.userRepository.createUser(info);
  }
  get(): Promise<User[]> {
    return this.userRepository.find();
  }
  getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ id });
  }
  updateUserById(id: string, info: createUserDTO): Promise<User> {
    const user_info = this.getUserById(id);
    const { email, password, firstName, lastName, avatar } = info;
    return this.userRepository.save({
      id: id,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      avata: avatar,
    });
  }
}
