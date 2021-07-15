import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { Category } from 'src/category/category.entity';
import { Message } from 'src/error/message-eror';
import { getConnection } from 'typeorm';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { BookDto } from './dto/book-dto';
import { authorIsExist, categoryIsExist } from './func/check-exist';
import { getDateNow } from './func/get-date';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getBooks(searchBooks: string): Promise<Book[]> {
    return this.bookRepository.getBook(searchBooks);
  }

  async getBookById(id: string): Promise<Book> {
    const found = await this.bookRepository.findOne({
      where: {
        id: id,
        isDelete: false,
      },
    });
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.user}=${id}`);
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
      const categoryFound = await categoryIsExist(categoryId);
      const authorFound = await authorIsExist(authorId);
      if (!categoryFound)
        throw new NotFoundException(Message.NOT_EXIST.cateogory);
      if (!authorFound) throw new NotFoundException(Message.NOT_EXIST.author);

      return await this.bookRepository.save({
        title: title,
        authorId: authorId,
        categoryId: categoryId,
        publishYear: publishYear,
        price: price,
        description: description,
        cover: cover,
        createdAt: getDateNow(),
        updatedAt: '',
        author: authorFound,
        category: categoryFound,
        isDelete: false,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 23505) {
        throw new ConflictException(Message.ALREADY_EXIST.book);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateBook(id: string, updateInfoBook: BookDto): Promise<Book> {
    const found = this.getBookById(id);
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.book}=${id}`);
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

      try {
        const categoryFound = await categoryIsExist(categoryId);
        const authorFound = await authorIsExist(authorId);

        if (!categoryFound)
          throw new NotFoundException(Message.NOT_EXIST.cateogory);
        if (!authorFound) throw new NotFoundException(Message.NOT_EXIST.author);

        return await this.bookRepository.save({
          ...found,
          id: id,
          title: title,
          authorId: authorId,
          categoryId: categoryId,
          publishYear: publishYear,
          price: price,
          description: description,
          cover: cover,
          updatedAt: getDateNow(),
          author: authorFound,
          category: categoryFound,
        });
      } catch (error) {
        console.log(error);
        if (error.code === 23505) {
          throw new ConflictException(Message.ALREADY_EXIST.book);
        }
        throw new InternalServerErrorException();
      }
    }
  }
  async deleteBook(id: string): Promise<string> {
    const found = this.getBookById(id);
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.book}=${id}`);
    } else {
      try {
        await this.bookRepository.save({
          ...found,
          isDelete: true,
        });
        return `delete book with Id=${id} is succes !`;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
