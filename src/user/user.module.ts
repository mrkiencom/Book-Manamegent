import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
