import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAllCategory();
  }
  @Get('/:id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }
  @Post()
  createCategory(@Body('name') name: string): Promise<Category> {
    return this.categoryService.createCategory(name);
  }
  @Patch('/:id')
  updateCategory(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, name);
  }
  @Delete('/:id')
  deleteCategory(@Param('id') id: string): Promise<string> {
    return this.categoryService.deleteCategory(id);
  }
}
