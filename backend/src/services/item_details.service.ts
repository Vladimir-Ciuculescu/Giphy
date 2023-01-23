import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDetailsDto } from 'src/dto/item_details.dto';
import { Item_Details } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ItemDetailsService {
  constructor(
    @InjectRepository(Item_Details)
    private readonly itemDetailsRepository: Repository<Item_Details>,
  ) {}

  async getItemDetails() {
    return await this.itemDetailsRepository.find();
  }

  async addItemDetails(itemDetailsDto: ItemDetailsDto) {
    const { serial_number, lot_number } = itemDetailsDto;
    return await this.itemDetailsRepository
      .createQueryBuilder()
      .insert()
      .into(Item_Details)
      .values([{ serial_number, lot_number }])
      .execute();
  }

  async updateItemDetails(id: number, itemDetailsDto: ItemDetailsDto) {
    const { serial_number, lot_number } = itemDetailsDto;

    return await this.itemDetailsRepository
      .createQueryBuilder()
      .update(Item_Details)
      .set({ serial_number: serial_number, lot_number: lot_number })
      .where('id = :id', { id })
      .execute();
  }

  async deleteItemDetails(id: number) {
    return await this.itemDetailsRepository
      .createQueryBuilder()
      .delete()
      .from(Item_Details)
      .where('id = :id', { id })
      .execute();
  }
}
