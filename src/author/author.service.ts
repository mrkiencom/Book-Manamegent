import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/error/message-eror';
import { Author } from './author.entity';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  async getAllAuthor(): Promise<Author[]> {
    return await this.authorRepository.find();
  }
  async getAuthorById(id: string): Promise<Author> {
    const found = await this.authorRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.author}=${id}`);
    }
    return found;
  }
  async updateAuthor(id: string, name: string): Promise<Author> {
    const found = await this.getAuthorById(id);
    if (found) {
      console.log(found);
      return await this.authorRepository.save({
        id: id,
        name: name,
      });
    }
  }
  async deleteAuthor(id: string): Promise<string> {
    const found = await this.getAuthorById(id);
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.author}=${id}`);
    } else {
      await this.authorRepository.delete({ id });
      return 'delete succes ! ';
    }
  }
  async createAuthor(name: string): Promise<Author> {
    const newAuthor = {
      name: name,
    };
    try {
      return await this.authorRepository.save(newAuthor);
    } catch (error) {
      console.log(error);
      if (error.code === 23505) {
        throw new ConflictException('Author a already exits');
      } else throw new InternalServerErrorException();
    }
  }
}
