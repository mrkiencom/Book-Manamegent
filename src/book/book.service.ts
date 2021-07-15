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
      var author = await getConnection()
        .getRepository(Author)
        .createQueryBuilder('author')
        .where('author.id = :authorId', { authorId })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    try {
      var category = await getConnection()
        .getRepository(Category)
        .createQueryBuilder('category')
        .where('category.id = :categoryId', { categoryId })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    try {
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
        author: author,
        category: category,
        isDelete: false,
      });
    } catch (error) {
      console.log(error);
      if (error.code === 23505) {
        throw new ConflictException('Book a already exits');
      }
      throw new InternalServerErrorException(error.message);
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

      const author = await getConnection()
        .getRepository(Author)
        .createQueryBuilder('author')
        .where('author.id = :authorId', { authorId })
        .getOne();
      const category = await getConnection()
        .getRepository(Category)
        .createQueryBuilder('category')
        .where('category.id = :categoryId', { categoryId })
        .getOne();
      try {
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
          author: author,
          category: category,
        });
      } catch (error) {
        console.log(error);
        if (error.code === 23505) {
          throw new ConflictException('Book a already exits');
        }
        throw new InternalServerErrorException();
      }
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
          isDelete: true,
        });
        return `delete book with Id=${id} is succes !`;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
