import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Author } from './author.entity';
import { AuthorService } from './author.service';

@Controller('author')
@UseGuards(AuthGuard())
export class AuthorController {
  constructor(private authorService: AuthorService) {}
  @Get()
  getAllAuthor(): Promise<Author[]> {
    return this.authorService.getAllAuthor();
  }
  @Post()
  createAuthor(@Body('name') name: string): Promise<Author> {
    return this.authorService.createAuthor(name);
  }
  @Get('/:id')
  getAuthorById(@Param('id') id: string): Promise<Author> {
    return this.authorService.getAuthorById(id);
  }
  @Patch('/:id')
  updateAuthor(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Author> {
    return this.authorService.updateAuthor(id, name);
  }
  @Delete('/:id')
  deleteAuthor(@Param('id') id: string): Promise<string> {
    return this.authorService.deleteAuthor(id);
  }
}
