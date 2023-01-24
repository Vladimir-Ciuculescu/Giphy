import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from 'src/dto/item.dto';
import { Items } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private readonly itemsRepository: Repository<Items>,
  ) {}

  async getItems(searchParams) {
    const { name, serial_number, lot_number } = searchParams;

    const query = await this.itemsRepository.createQueryBuilder('items');

    if (name) {
      query.andWhere('items.name = :name', { name });
    }

    return query.getMany();
    // const items = await this.itemsRepository.find();
    // return items;
  }

  async getItemById(id: number) {
    const item = await this.itemsRepository.findOneBy({ id: id });
    return item;
  }

  async getItemByName(name) {
    const item = await this.itemsRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    return item;
  }

  async addItem(item: ItemDto) {
    const { name, description, price, image_link, material, size } = item;
    return await this.itemsRepository
      .createQueryBuilder()
      .insert()
      .into(Items)
      .values([{ name, description, price, image_link, material, size }])
      .execute();
  }

  async updateItem(id: number, item: ItemDto) {
    const { name, description } = item;
    return await this.itemsRepository
      .createQueryBuilder()
      .update(Items)
      .set({ name: name, description: description })
      .where('id =:id', { id: id })
      .execute();
  }

  async deleteItem(id: number) {
    return await this.itemsRepository
      .createQueryBuilder()
      .delete()
      .from(Items)
      .where('id = :id', { id: id })
      .execute();
  }
}
