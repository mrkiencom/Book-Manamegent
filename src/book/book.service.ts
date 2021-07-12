import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { BookDto } from './dto/book-dto';
import { getDateNow } from './func/get-date';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
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
      authorId,
      categoryId,
      publishYear,
      price,
      description,
      cover,
    } = newBook;
    try {
      return await this.bookRepository.save({
        title: title,
        author_id: authorId,
        category_id: categoryId,
        publish_year: publishYear,
        price: price,
        description: description,
        cover: cover,
        createdAt: getDateNow(),
        updateAt: null,
        is_delete: false,
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
        authorId,
        categoryId,
        publishYear,
        price,
        description,
        cover,
      } = updateInfoBook;
      return this.bookRepository.save({
        ...found,
        id: id,
        title: title,
        author_id: authorId,
        category_id: categoryId,
        publish_year: publishYear,
        price: price,
        description: description,
        cover: cover,
        updatedAt: getDateNow(),
      });
    }
  }
  async deleteBook(id: string): Promise<string> {
    const found = this.getBookById(id);
    if (!found) {
      throw new NotFoundException(`Not Found User with ID=${id}`);
    } else {
      try {
        await this.bookRepository.save({
          ...found,
          is_delete: true,
        });
        return `delete book with Id=${id} is succes !`;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
