import { EntityRepository, Repository } from 'typeorm';
import { createUserDTO } from './dto/CreateUser.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(user: createUserDTO): Promise<User> {
    const { email, password, firstName, lastName, avatar } = user;

    const new_User = this.create({
      email,
      password,
      firstName,
      lastName,
      avatar,
    });
    await this.save(new_User);
    return new_User;
  }
}
