import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBook(search: string): Promise<Book[]> {
    if (search) {
      const query = this.createQueryBuilder('book');

      // query.where('book.title LIKE :search', { search });
      query.andWhere('LOWER(book.title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
      const books = await query.getMany();
      return books.filter((x) => x.isDelete === false);
    }
    return this.find({
      where: {
        isDelete: false,
      },
    });
  }
}
