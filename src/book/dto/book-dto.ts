import { IsNotEmpty } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  authorId: string;
  @IsNotEmpty()
  categoryId: string;
  @IsNotEmpty()
  publishYear: string;
  @IsNotEmpty()
  price: string;
  description: string;
  @IsNotEmpty()
  cover: string;
}
