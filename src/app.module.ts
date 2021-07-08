import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';

import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';

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
  ],
})
export class AppModule {}
