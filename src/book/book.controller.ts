import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { BookDto } from './dto/book-dto';
import { GetBooksFilterDto } from './dto/book-filter';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  getBooks(@Query() searchBookDto: GetBooksFilterDto): Promise<Book[]> {
    return this.bookService.getBooks(searchBookDto);
  }
  @Get('/:id')
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.getBookById(id);
  }
  @Post()
  createBook(@Body() newBook: BookDto): Promise<Book> {
    return this.bookService.createBook(newBook);
  }
  @Patch('/:id')
  updateBook(
    @Param('id') id: string,
    @Body() newInfoBook: BookDto,
  ): Promise<Book> {
    return this.bookService.updateBook(id, newInfoBook);
  }
  @Delete('/:id')
  deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteBook(id);
  }
}
