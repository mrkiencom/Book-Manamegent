import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthorModule } from 'src/author/author.module';
import { AuthorRepository } from 'src/author/author.repository';
import { AuthorService } from 'src/author/author.service';
import { CategoryModule } from 'src/category/category.module';
import { CategoryRepository } from 'src/category/category.repository';
import { BookController } from './book.controller';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookRepository,
      AuthorRepository,
      CategoryRepository,
    ]),
    AuthModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
