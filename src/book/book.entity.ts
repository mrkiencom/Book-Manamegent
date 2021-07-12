import { Contains, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  description: string;
  @Column()
  @IsNotEmpty()
  cover: string;
  @Column()
  @IsNotEmpty()
  createdAt: Date;
  @Column()
  @IsOptional()
  updatedAt: Date;
  @Column()
  is_delete: boolean;
}
