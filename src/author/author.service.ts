import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/error/message-eror';
import { Author } from './author.entity';
import { AuthorRepository } from './author.repository';
import { AuthorDto } from './dto/author-update.dto';

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
      throw new NotFoundException(`${Message.NOT_FOUND.AUTHOR}=${id}`);
    }
    return found;
  }
  async updateAuthor(id: string, updateDto: AuthorDto): Promise<Author> {
    const { name } = updateDto;
    const found = await this.getAuthorById(id);
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.AUTHOR}=${id}`);
    }

    try {
      return await this.authorRepository.save({ ...found, name });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteAuthor(id: string): Promise<Author> {
    const found = await this.authorRepository.findOne({
      where: { id, isDeleted: false },
    });
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.AUTHOR}=${id}`);
    }

    try {
      return await this.authorRepository.save({ ...found, isDeleted: true });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async createAuthor(name: string): Promise<Author> {
    const newAuthor = {
      name,
    };
    try {
      return await this.authorRepository.save(newAuthor);
    } catch (error) {
      if (error.code === Message.ERROR_CODE.EXIST) {
        throw new ConflictException(Message.ALREADY_EXIST.AUTHOR);
      }
      throw new InternalServerErrorException();
    }
  }
}
