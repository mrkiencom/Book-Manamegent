import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { createUserDTO } from './dto/CreateUser.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch('/:id')
  updateUserById(
    @Param('id') id: string,
    @Body() info: createUserDTO,
  ): Promise<User> {
    return this.userService.updateUserById(id, info);
  }

  @Get()
  get(): Promise<User[]> {
    return this.userService.get();
  }
}
