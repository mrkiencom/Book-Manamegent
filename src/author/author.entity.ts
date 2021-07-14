import { IsNotEmpty } from 'class-validator';
import { Book } from 'src/book/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @IsNotEmpty()
  name: string;
<<<<<<< HEAD
  @OneToMany((_type) => Book, (book) => book.author, { eager: true })
  books: Book[];
=======
  @Column()
  is_delete: boolean;
}
