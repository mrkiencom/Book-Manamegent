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
  async createUser(info: createUserDTO): Promise<User> {
    return this.userRepository.createUser(info);
  }
  get(): Promise<User[]> {
    return this.userRepository.find();
  }
  getUserById(id: string): Promise<User> {
    const found = this.userRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`Not Found User with ID=${id}`);
    }
    return found;
  }
  async updateUserById(id: string, info: createUserDTO): Promise<User> {
    const { email, password, firstName, lastName, avatar } = info;
<<<<<<< HEAD
=======

>>>>>>> 15d8824a2a9ad25299066c3faeee2e79e3bae2cc
    const user = this.userRepository.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Not found user with id=${id}`);
    }
    try {
      return this.userRepository.save({
        id: id,
        email: email,
        password: password,
<<<<<<< HEAD
        firstName: firstName,
        lastName: lastName,
=======
        first_Name: firstName,
        last_Name: lastName,
>>>>>>> 15d8824a2a9ad25299066c3faeee2e79e3bae2cc
        avata: avatar,
      });
    } catch (error) {
      console.log(error);
    }
<<<<<<< HEAD
=======

>>>>>>> 15d8824a2a9ad25299066c3faeee2e79e3bae2cc
  }
}
