import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item_Details } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ItemDetailsService {
  constructor(
    @InjectRepository(Item_Details)
    private readonly itemDetailsRepository: Repository<Item_Details>,
  ) {}

  //   async getItemInfo() {}
}
