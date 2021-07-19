import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createUserDTO } from 'src/user/dto/CreateUser.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/users.repository';
import { AuthService } from './auth.service';
import { AuthUser } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signin')
  signIn(@Body() account: AuthUser): Promise<{ accessToken: string }> {
    return this.authService.signIn(account);
  }

  @Post('/signup')
  createUser(@Body() info: createUserDTO): Promise<User> {
    return this.authService.createUser(info);
  }
}
