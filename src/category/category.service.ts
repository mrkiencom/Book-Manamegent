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
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    @Inject(forwardRef(() => CategoryService))
    private categoryRepository: CategoryRepository,
  ) {}
  async getAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        isDelete: false,
      },
    });
  }
  async getCategoryById(id: string): Promise<Category> {
    const found = await this.categoryRepository.findOne({
      where: { id: id, isDelete: false },
    });
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.cateogory}=${id}`);
    }
    return found;
  }
  async createCategory(name: string): Promise<Category> {
    const newCategory = {
      name: name,
      isDelete: false,
    };
    try {
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      console.log(error);
      if (error.code === 23505) {
        throw new ConflictException('Author a already exits');
      }
      throw new InternalServerErrorException();
    }
  }
  async updateCategory(id: string, name: string): Promise<Category> {
    const found = await this.getCategoryById(id);
    found.name = name;
    if (found) return this.categoryRepository.save(found);
    else {
      throw new NotFoundException(`${Message.NOT_FOUND.cateogory}=${id}`);
    }
  }
  async deleteCategory(id: string): Promise<string> {
    const found = await this.getCategoryById(id);
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.cateogory}=${id}`);
    } else {
      await this.categoryRepository.save({ ...found, isDelete: true });
      return 'delete category succes ! ';
    }
  }
}
