import { InternalServerErrorException } from '@nestjs/common';
import { Author } from 'src/author/author.entity';
import { Category } from 'src/category/category.entity';
import { getConnection } from 'typeorm';

export async function categoryIsExist(categoryId: string): Promise<Category> {
  try {
    const found = await getConnection()
      .getRepository(Category)
      .createQueryBuilder('category')
      .where('category.id = :categoryId', { categoryId })
      .getOne();
    return found;
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
}
export async function authorIsExist(authorId: string): Promise<Author> {
  try {
    var found = await getConnection()
      .getRepository(Author)
      .createQueryBuilder('author')
      .where('author.id = :authorId', { authorId })
      .getOne();
    return found;
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
}
