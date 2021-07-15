import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { createUserDTO } from './dto/CreateUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    console.log(configService.get('TEST_VALUE'));
  }
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
  @Post()
  createUser(@Body() info: createUserDTO): Promise<User> {
    return this.userService.createUser(info);
  }
  @Patch('/:id')
  updateUserById(
    @Param('id') id: string,
    @Body() info: createUserDTO,
  ): Promise<User> {
    return this.userService.updateUserById(id, info);
  }
  @Get()
  @UseGuards(AuthGuard())
  get(): Promise<User[]> {
    return this.userService.get();
  }
}
