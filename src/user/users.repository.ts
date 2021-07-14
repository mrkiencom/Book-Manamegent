import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { createUserDTO } from './dto/CreateUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: createUserDTO): Promise<User> {
    const { email, password, firstName, lastName, avatar } = user;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.create({
      email,
      password: hashedPassword,
      first_Name: firstName,
      last_Name: lastName,
      avatar,
    });
    try {
      return this.save(newUser);
    } catch (error) {
      console.log(error);
      if (error.code === 23505) {
        throw new ConflictException('Email a already exits');
      } else throw new InternalServerErrorException();
    }
  }
}
