import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/dto/category.dto';
import { Categories } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategory(category: CategoryDto) {
    const { name, description } = category;

    const addedCategory = new Categories();
    addedCategory.name = name;
    addedCategory.description = description;

    return await addedCategory.save();
  }

  async updateCategory(id: number, category: CategoryDto) {
    const { name, description } = category;

    await this.categoriesRepository
      .createQueryBuilder()
      .update(Categories)
      .set({ name: name, description: description })
      .where('id =:id', { id: id })
      .execute();
  }

  async deleteCategory(id: number) {
    await this.categoriesRepository
      .createQueryBuilder()
      .delete()
      .from(Categories)
      .where('id = :id', { id: id })
      .execute();
  }
}
