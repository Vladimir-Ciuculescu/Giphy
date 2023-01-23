import { Controller, Get, Param } from '@nestjs/common';
import { ItemDetailsDto } from 'src/dto/item_details.dto';

@Controller('item-details')
export class ItemDetailsController {
  constructor(private readonly itemDetailsService: ItemDetailsDto) {}

  // @Get('/:id')
  // async getItemInfo(@Param('id') id:number){
  //   const item = await return this.itemDetailsService()
  // }
}
