import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryDto } from 'src/dto/category.dto';
import { CategoriesService } from 'src/services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return await this.categoriesService.getCategories();
  }

  @Post('/add')
  async addCategory(@Body() category: CategoryDto) {
    return await this.categoriesService.addCategory(category);
  }

  @Put('/:id')
  async updateCategory(@Param('id') id: number, @Body() category: CategoryDto) {
    await this.categoriesService.updateCategory(id, category);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: number) {
    await this.categoriesService.deleteCategory(id);
  }
}
