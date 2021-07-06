import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

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
  ],
  // controllers: [UserController],
  // controllers: [BookController],
  // providers: [BookService],
})
export class AppModule {}
