import { Contains, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  description: string;
  @Column()
  @IsNotEmpty()
  cover: string;
  @Column({ name: 'create_at' })
  @IsNotEmpty()
  createdAt: Date;
  @Column({ name: 'update_at' })
  @IsOptional()
  updatedAt: Date;
  @Column({ name: 'is_delete' })
  isDelete: boolean;
}
