import { Module } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './author.repository';
import { AuthorService } from './author.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository]), AuthModule],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
