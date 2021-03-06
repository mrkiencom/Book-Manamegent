import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDTO } from './dto/CreateUser.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  get(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: string): Promise<User> {
    const found = this.userRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`Not Found User with ID=${id}`);
    }
    return found;
  }

  async updateUserById(id: string, info: createUserDTO): Promise<User> {
    const { email, password, firstName, lastName, avatar } = info;
    const user = this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Not found user with id=${id}`);
    }
    try {
      return this.userRepository.save({
        id: id,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        avata: avatar,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
