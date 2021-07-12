import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      throw new NotFoundException(`Not Found User with ID=${id}`);
    }
    return found;
  }
  async updateAuthor(id: string, updateDto: AuthorDto): Promise<Author> {
    const { name } = updateDto;
    const found = await this.getAuthorById(id);
    if (found) {
      found.name = name;
      return await this.authorRepository.save(found);
    }
  }
  async deleteAuthor(id: string): Promise<string> {
    const found = await this.getAuthorById(id);
    if (!found) {
      throw new NotFoundException(`Not Found User with ID=${id}`);
    } else {
      found.is_delete = true;
      try {
        await this.authorRepository.save(found);
        return 'delete succes ! ';
      } catch (error) {
        console.log(error);
      }
    }
  }
  async createAuthor(name: string): Promise<Author> {
    const newAuthor = {
      name: name,
      is_delete: false,
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
