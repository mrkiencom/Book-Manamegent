import { Contains, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { Author } from 'src/author/author.entity';
import { Category } from 'src/category/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookService } from './book.service';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;

  @Column({ name: 'author_id' })
  authorId: string;

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column({ name: 'publish_year' })
  publishYear: string;

  @Column()
  price: string;

  @Column()
  description: string;

  @Column()
  cover: string;

  @CreateDateColumn({ name: 'create_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: string;

  @ManyToOne((_type) => Author, (author) => author.books, {
    eager: false,
  })
  author: Author;

  @ManyToOne((_type) => Category, (category) => category.books, {
    eager: false,
  })
  category: Category;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;
}
