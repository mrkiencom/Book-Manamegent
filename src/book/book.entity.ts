import { Contains, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { Author } from 'src/author/author.entity';
import { Category } from 'src/category/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookService } from './book.service';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @IsNotEmpty()
  title: string;
  @Column()
  @IsNotEmpty()
  author_id: string;
  @Column()
  @IsNotEmpty()
  category_id: string;
  @Column()
  @IsNotEmpty()
  publish_year: string;
  @Column()
  @IsNotEmpty()
  price: string;
  @Column()
  @IsNotEmpty()
  description: string;
  @Column()
  @IsNotEmpty()
  cover: string;
  @Column()
  @IsNotEmpty()
  createdAt: string;
  @Column()
  @IsOptional()
  updatedAt: string;
  @ManyToOne((_type) => Author, (author) => author.books, {
    eager: false,
  })
  author: Author;

  @ManyToOne((_type) => Category, (category) => category.books, {
    eager: false,
  })
  category: Category;
  @Column()
  is_delete: boolean;
}
