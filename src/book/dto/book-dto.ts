import { IsNotEmpty, IsOptional } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  authorName: string;

  @IsNotEmpty()
  categoryName: string;

  @IsNotEmpty()
  publishYear: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  cover: string;
}
