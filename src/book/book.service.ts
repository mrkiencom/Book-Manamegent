import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { AuthorRepository } from 'src/author/author.repository';
import { Category } from 'src/category/category.entity';
import { CategoryRepository } from 'src/category/category.repository';

import { Message } from 'src/error/message-eror';

import { Book } from './book.entity';
import { BookRepository } from './book.repository';
import { BookDto } from './dto/book-dto';
import { GetBooksFilterDto } from './dto/book-filter';
import { authorIsExist, categoryIsExist } from './func/check-exist';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
    private authorRepository: AuthorRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async getBooks(searchBooks: GetBooksFilterDto): Promise<Book[]> {
    return this.bookRepository.getBook(searchBooks);
  }

  async getBookById(id: string): Promise<Book> {
    const found = await this.bookRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.USER}=${id}`);
    }
    return found;
  }

  async createCategory(categoryName: string): Promise<Category> {
    const categoryFound = await this.categoryRepository.findOne({
      name: categoryName,
    });

    if (!categoryFound) {
      const newCategory = {
        name: categoryName,
      };
      return await this.categoryRepository.save(newCategory);
    }

    return categoryFound;
  }

  async createAuthor(authorName: string): Promise<Author> {
    const authorFound = await this.authorRepository.findOne({
      name: authorName,
    });
    if (!authorFound) {
      const newAuthor = {
        name: authorName,
      };
      return await this.authorRepository.save(newAuthor);
    }
    return authorFound;
  }

  async createBook(newBook: BookDto): Promise<Book> {
    const {
      title,
      authorName,
      categoryName,
      publishYear,
      price,
      description,
      cover,
    } = newBook;
    try {
      const newCreatedAuthor = await this.createAuthor(authorName);
      const newCreatedCategory = await this.createCategory(categoryName);

      return await this.bookRepository.save({
        title: title,
        authorId: newCreatedAuthor.id,
        categoryId: newCreatedCategory.id,
        publishYear: publishYear,
        price: price,
        description: description,
        cover: cover,
        author: newCreatedAuthor,
        category: newCreatedCategory,
      });
    } catch (error) {
      console.log(error);
      if (error.code === Message.ERROR_CODE.EXIST) {
        throw new ConflictException(Message.ALREADY_EXIST.BOOK);
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateBook(id: string, updateInfoBook: BookDto): Promise<Book> {
    const found = this.getBookById(id);
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.BOOK}=${id}`);
    }
    const {
      title,
      authorName,
      categoryName,
      publishYear,
      price,
      description,
      cover,
    } = updateInfoBook;

    try {
      const newCreatedAuthor = await this.createAuthor(authorName);
      const newCreatedCategory = await this.createCategory(categoryName);

      return await this.bookRepository.save({
        ...found,
        title,
        authorId: newCreatedAuthor.id,
        categoryId: newCreatedCategory.id,
        publishYear,
        price,
        description,
        cover,
        author: newCreatedAuthor,
        category: newCreatedCategory,
      });
    } catch (error) {
      if (error.code === Message.ERROR_CODE.EXIST) {
        throw new ConflictException(Message.ALREADY_EXIST.BOOK);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async deleteBook(id: string): Promise<Book> {
    const found = this.getBookById(id);
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.BOOK}=${id}`);
    }

    try {
      return await this.bookRepository.save({
        ...found,
        isDeleted: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
