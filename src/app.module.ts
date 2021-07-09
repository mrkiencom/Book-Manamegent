import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { CategoryModule } from './category/category.module';

import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'book-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    AuthModule,
    AuthorModule,
    BookModule,
  ],
})
export class AppModule {}
