import { IsNotEmpty } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  author_id: string;
  @IsNotEmpty()
  category_id: string;
  @IsNotEmpty()
  publish_year: string;
  @IsNotEmpty()
  price: number;
  description: string;
  @IsNotEmpty()
  cover: string;
  @IsNotEmpty()
  createdAt: Date;
  updatedAt: Date;
}
