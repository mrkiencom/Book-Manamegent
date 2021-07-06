import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { createUserDTO } from './dto/CreateUser.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: createUserDTO): Promise<User> {
    const { email, password, firstName, lastName, avatar } = user;
    const newUser = this.create({
      email,
      password,
      firstName,
      lastName,
      avatar,
    });
    try {
      return this.save(newUser);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }
}
