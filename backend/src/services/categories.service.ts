import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async addCategory(category) {
    const { name, description } = category;
    return await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(Categories)
      .values([{ name: name, description: description }])
      .execute();
  }

  async updateCategory(id, body) {
    const { name, description } = body;

    return await this.categoriesRepository
      .createQueryBuilder()
      .update(Categories)
      .set({ name: name, description: description })
      .where('id =:id', { id: id })
      .execute();
  }

  async deleteCategory(id) {
    return await this.categoriesRepository
      .createQueryBuilder()
      .delete()
      .from(Categories)
      .where('id = :id', { id: id })
      .execute();
  }
}
