import { Book } from 'src/book/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsOptional } from 'class-validator';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @IsNotEmpty()
  name: string;
  @OneToMany((_type) => Book, (book) => book.category, { eager: true })
  books: Book[];
  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;
}
