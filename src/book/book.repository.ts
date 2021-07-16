import { InternalServerErrorException } from '@nestjs/common';
import { Message } from 'src/error/message-eror';
import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';
import { GetBooksFilterDto } from './dto/book-filter';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBook(searchBookDto: GetBooksFilterDto): Promise<Book[]> {
    const { search, author, category } = searchBookDto;
    const query = await this.createQueryBuilder('book');

    if (search) {
      query.andWhere('book.name LIKE :search', { search });
    }
    if (author) {
      query.andWhere(`author.name LIKE :author`, {
        author: `%${author}%`,
      });
    }

    if (category) {
      query.andWhere(`category.name LIKE :category`, {
        category: `%${category}%`,
      });
    }

    try {
      return (await query.getMany()).filter(
        (iteam) => iteam.isDeleted === false,
      );
    } catch (error) {
      throw new InternalServerErrorException(Message.NOT_EXIST.BOOK);
    }
  }
}
