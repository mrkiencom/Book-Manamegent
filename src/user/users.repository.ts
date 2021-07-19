import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { createUserDTO } from './dto/CreateUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Message } from 'src/error/message-eror';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: createUserDTO): Promise<User> {
    const { email, password, firstName, lastName, avatar } = user;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      avatar,
    };
    try {
      return await this.save(newUser);
    } catch (error) {
      console.log(error);
      if (error.code === Message.ERROR_CODE.EXIST) {
        throw new ConflictException('Email a already exits');
      } else throw new InternalServerErrorException();
    }
  }
}
