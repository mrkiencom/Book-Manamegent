import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { Category } from 'src/category/category.entity';
import { getConnection } from 'typeorm';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { BookDto } from './dto/book-dto';
import { getDateNow } from './func/get-date';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getBooks(searchBooks: string): Promise<Book[]> {
    // return await this.bookRepository.find({ title: searchBooks });
    return this.bookRepository.getBook(searchBooks);
  }
  async getBookById(id: string): Promise<Book> {
    const found = await this.bookRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`Not Found User with ID=${id}`);
    }
    return found;
  }
  async createBook(newBook: BookDto): Promise<Book> {
    const {
      title,
      author_id,
      category_id,
      publish_year,
      price,
      description,
      cover,
    } = newBook;
    const author = await getConnection()
      .getRepository(Author)
      .createQueryBuilder('author')
      .where('author.id = :author_id', { author_id })
      .getOne();
    const category = await getConnection()
      .getRepository(Category)
      .createQueryBuilder('category')
      .where('category.id = :category_id', { category_id })
      .getOne();
    console.log(author, category);
    try {
      return await this.bookRepository.save({
        title,
        author_id,
        category_id,
        publish_year,
        price,
        description,
        cover,
        createdAt: getDateNow(),
        updatedAt: '',
        author: author,
        category: category,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 23505) {
        throw new ConflictException('Book a already exits');
      } else throw new InternalServerErrorException();
    }
  }

  async updateBook(id: string, updateInfoBook: BookDto): Promise<Book> {
    const found = this.getBookById(id);
    if (!found) {
      throw new NotFoundException(`Not Found User with ID=${id}`);
    } else {
      const {
        title,
        author_id,
        category_id,
        publish_year,
        price,
        description,
        cover,
      } = updateInfoBook;
      const author = await getConnection()
        .getRepository(Author)
        .createQueryBuilder('author')
        .where('author.id = :author_id', { author_id })
        .getOne();
      const category = await getConnection()
        .getRepository(Category)
        .createQueryBuilder('category')
        .where('category.id = :category_id', { category_id })
        .getOne();

      try {
        return await this.bookRepository.save({
          ...found,
          id: id,
          title: title,
          author_id: author_id,
          category_id: category_id,
          publish_year: publish_year,
          price: price,
          description: description,
          cover: cover,
          updatedAt: getDateNow(),
          author: author,
          category: category,
        });
      } catch (error) {
        console.log(error);
        if (error.code === 23505) {
          throw new ConflictException('Book a already exits');
        } else throw new InternalServerErrorException();
      }
    }
  }
  async deleteBook(id: string): Promise<string> {
    const found = this.getBookById(id);
    if (!found) {
      throw new NotFoundException(`Not Found User with ID=${id}`);
    } else {
      await this.bookRepository.delete({ id });
      return `delete book with Id=${id} is succes !`;
    }
  }
}
