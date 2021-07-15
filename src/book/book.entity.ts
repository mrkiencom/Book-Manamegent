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
  @Column({ name: 'author_id' })
  @IsNotEmpty()
  authorId: string;
  @Column({ name: 'category_id' })
  @IsNotEmpty()
  categoryId: string;
  @Column({ name: 'publish_year' })
  @IsNotEmpty()
  publishYear: string;
  @Column()
  @IsNotEmpty()
  price: string;
  @Column()
  @IsNotEmpty()
  description: string;
  @Column()
  @IsNotEmpty()
  cover: string;
  @Column({ name: 'create_at' })
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
  isDelete: boolean;
}
