import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignCategoryDto } from 'src/dto/assign_category.dto';
import { ItemDto } from 'src/dto/item.dto';
import { SearchParamsDto } from 'src/dto/search_item.dto';
import { UpdateItemDto } from 'src/dto/update_item_dto';
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

  async getItems(searchParams: SearchParamsDto) {
    const { name, serial_number, lot_number } = searchParams;

    const query = await this.itemsRepository
      .createQueryBuilder('items')
      .leftJoinAndSelect('items.items_details', 'items_details')
      .leftJoinAndSelect('items.categories', 'categories');

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
  }

  async getItemById(id: number) {
    const item = await this.itemsRepository.findOneBy({ id: id });
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
    await this.itemsDetailsService.addItemDetails(addedItem.id);
  }

  async assignItemCategory(assignCategoryDto: AssignCategoryDto) {
    const { itemId, categoryId } = assignCategoryDto;

    await this.itemsRepository
      .createQueryBuilder()
      .relation(Items, 'categories')
      .of(itemId)
      .add(categoryId);
  }

  async updateItem(id: number, data: UpdateItemDto) {
    const { item, categories } = data;

    const {
      name,
      description,
      price,
      image_link,
      material,
      size,
      serial_number,
      lot_number,
    } = item;
    const itemDetails = {
      serial_number: serial_number,
      lot_number: lot_number,
    };

    //Update item fields from table Items
    await this.itemsRepository
      .createQueryBuilder()
      .update(Items)
      .set({
        name: name,
        description: description,
        price: price,
        image_link: image_link,
        material: material,
        size: size,
      })
      .where('id =:id', { id: id })
      .execute();

    //Update item details
    if (serial_number !== undefined || lot_number !== undefined) {
      await this.itemsDetailsService.updateItemDetails(id, itemDetails);
    }

    const idsToRemove = [];
    const idsToAdd = [];

    categories.map((category) => {
      idsToAdd.push(category.id);
    });

    //Get all categories ids for the current item
    const Item = await this.getItemCategories(id);

    Item.categories.map((category) => {
      idsToRemove.push(category.id);
    });

    //Remove actual relations between categories and the item and replace them with new ones
    await this.itemsRepository
      .createQueryBuilder()
      .relation(Items, 'categories')
      .of(id)
      .addAndRemove(idsToAdd, idsToRemove);
  }

  async deleteItem(id: number) {
    await this.itemsRepository
      .createQueryBuilder()
      .delete()
      .from(Items)
      .where('id = :id', { id: id })
      .execute();

    await this.itemsDetailsService.deleteItemDetails(id);
  }
}
