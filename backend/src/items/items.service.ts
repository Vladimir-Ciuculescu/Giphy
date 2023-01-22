import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';
import { Item } from './item.entity';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>,
    ) { }

    async getItems(): Promise<Item[]> {
        return this.itemRepository.find();
    }

    async getItemById(id: number): Promise<Item> {
        const item = await this.itemRepository.findOneBy({ id });

        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }

        return item;
    }

    async addItem(addItemDto: AddItemDto): Promise<Item> {
        const item = this.itemRepository.create(addItemDto);

        return this.itemRepository.save(item);
    }

    async updateItem(id: number, addItemDto: AddItemDto) {
        const item = await this.getItemById(id);

        return this.itemRepository.save({ ...item, ...addItemDto });
    }

    async deleteItem(id: number): Promise<Item> {
        const item = await this.getItemById(id);

        return this.itemRepository.remove(item);
    }
}
