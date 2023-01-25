import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignCategoryDto } from 'src/dto/assign_category.dto';
import { ItemDto } from 'src/dto/item.dto';
import { Items } from 'src/entities';
import { Repository } from 'typeorm';

import { ItemDetailsService } from './item_details.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private readonly itemsRepository: Repository<Items>,
    @Inject(ItemDetailsService)
    private readonly itemsDetailsService: ItemDetailsService,
  ) {}

  async getItems(searchParams) {
    const { name, serial_number, lot_number } = searchParams;

    const query = await this.itemsRepository
      .createQueryBuilder('items')
      .leftJoinAndSelect('items.items_details', 'items_details')
      .leftJoinAndSelect('items.categories', 'categories')

    if (name) {
      query.andWhere('items.name = :name', { name });
    }

    if (serial_number) {
      query.andWhere('items_details.serial_number  = :serial_number', {
        serial_number,
      });
    }

    if (lot_number) {
      query.andWhere('items_details.lot_number  = :lot_number', {
        lot_number,
      });
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

  async getItemCategories(id: number) {
    return await this.itemsRepository
      .createQueryBuilder('items')
      .leftJoinAndSelect('items.categories', 'categories')
      .where('items.id = :id', { id })
      .getOne();
  }

  async addItem(item: ItemDto) {
    const { name, description, price, image_link, material, size } = item;

    const addedItem = new Items();
    addedItem.name = name;
    addedItem.description = description;
    addedItem.price = price;
    addedItem.image_link = image_link;
    addedItem.material = material;
    addedItem.size = size;
    await addedItem.save();

    // const itemData = await this.itemsRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Items)
    //   .values([{ name, description, price, image_link, material, size }])
    //   .execute();

    return await this.itemsDetailsService.addItemDetails(addedItem.id);
  }

  async assignItemCategory(assignCategoryDto: AssignCategoryDto) {
    const { itemId, categoryId } = assignCategoryDto;

    return await this.itemsRepository
      .createQueryBuilder()
      .relation(Items, 'categories')
      .of(itemId)
      .add(categoryId);
  }

  async updateItem(id: number, item: ItemDto) {
    const { name, description, price, image_link, material, size, serial_number, lot_number } = item;
    const itemDetails = {
      serial_number: serial_number,
      lot_number: lot_number,
    };
    await this.itemsRepository
      .createQueryBuilder()
      .update(Items)
      .set({ name: name, description: description, price: price, image_link: image_link, material: material, size: size })
      .where('id =:id', { id: id })
      .execute();
    
    return await this.itemsDetailsService.updateItemDetails(id, itemDetails);
  }

  async deleteItem(id: number) {
    await this.itemsRepository
      .createQueryBuilder()
      .delete()
      .from(Items)
      .where('id = :id', { id: id })
      .execute();
    
    return await this.itemsDetailsService.deleteItemDetails(id);
  }
}
