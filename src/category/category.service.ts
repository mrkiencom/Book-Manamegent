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
        isDeleted: false,
      },
    });
  }
  async getCategoryById(id: string): Promise<Category> {
    const found = await this.categoryRepository.findOne({
      where: { id: id, isDeleted: false },
    });
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.CATEGORY}=${id}`);
    }
    return found;
  }
  async createCategory(name: string): Promise<Category> {
    const newCategory = {
      name: name,
    };
    try {
      return await this.categoryRepository.save({ ...newCategory, name });
    } catch (error) {
      if (error.code === 23505) {
        throw new ConflictException(Message.ALREADY_EXIST.CATEGORY);
      }
      throw new InternalServerErrorException(error.message);
    }
  }
  async updateCategory(id: string, name: string): Promise<Category> {
    const found = await this.getCategoryById(id);
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.CATEGORY}=${id}`);
    }
    try {
      return this.categoryRepository.save({ ...found, name });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async deleteCategory(id: string): Promise<Category> {
    const found = await this.getCategoryById(id);
    if (!found) {
      throw new NotFoundException(`${Message.NOT_FOUND.CATEGORY}=${id}`);
    }
    return await this.categoryRepository.save({ ...found, isDeleted: true });
  }
}
