import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ItemDetailsDto } from 'src/dto/item_details.dto';
import { ItemDetailsService } from 'src/services/item_details.service';

@Controller('item-details')
export class ItemDetailsController {
  constructor(private readonly itemDetailsService: ItemDetailsService) {}

  @Get()
  async getItemDetails() {
    return await this.itemDetailsService.getItemDetails();
  }

  @Post('/add')
  @UsePipes(ValidationPipe)
  async addItemDetails(@Body() itemDetailsDto: ItemDetailsDto) {
    return await this.itemDetailsService.addItemDetails(itemDetailsDto);
  }

  @Put('/:id')
  async updateItemDetails(@Param('id') id: number, @Body() itemDetailsDto: ItemDetailsDto) {
    return await this.itemDetailsService.updateItemDetails(id, itemDetailsDto);
  }

  @Delete('/:id')
  async deleteItemDetails(@Param('id') id: number) {
    return await this.itemDetailsService.deleteItemDetails(id);
  }
}
