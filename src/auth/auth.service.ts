import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/users.repository';
import { AuthUser } from './dto/auth-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createUserDTO } from 'src/user/dto/CreateUser.dto';
import { User } from 'src/user/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signIn(account: AuthUser): Promise<{ accessToken: string }> {
    const { email, password } = account;
    const user = await this.userRepository.findOne({ email });
    if (user && (await bcrypt.compareSync(password, user.password))) {
      const accessToken: string = await this.jwtService.sign({ email });
      return { accessToken };
    } else {
      throw new UnauthorizedException('please check your loggin credentials');
    }
  }
  async createUser(info: createUserDTO): Promise<User> {
    return this.userRepository.createUser(info);
  }
}
