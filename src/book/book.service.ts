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

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
  ) {}
  async getAllBook(): Promise<Book[]> {
    return await this.bookRepository.find();
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
      createdAt,
      updatedAt,
    } = newBook;
    try {
      return await this.bookRepository.save({
        title,
        author_id,
        category_id,
        publish_year,
        price,
        description,
        cover,
        createdAt,
        updatedAt,
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
        createdAt,
        updatedAt,
      } = updateInfoBook;
      return this.bookRepository.save({
        id: id,
        title: title,
        author_id: author_id,
        category_id: category_id,
        publish_year: publish_year,
        price: price,
        description: description,
        cover: cover,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });
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
