import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemDto } from 'src/dto/item.dto';
import { ItemsService } from 'src/services/items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  //Get all items
  @Get()
  async getItems() {
    const items = await this.itemsService.getItems();
    return items;
  }

  //Get item by id
  @Get('/:id')
  async getItemById(@Param('id') id: number) {
    const item = await this.itemsService.getItemById(id);
    return item;
  }

  //Get item by name (CASE SENSITIVE)
  @Get('/search/name')
  async getItemByName(@Body() body) {
    const { name } = body;
    const item = await this.itemsService.getItemByName(name);
    return item;
  }

  //Add a new item with body data
  @Post('/add')
  @UsePipes(ValidationPipe)
  async addItem(@Body() addItemDto: ItemDto) {
    return await this.itemsService.addItem(addItemDto);
  }

  //Update an item after id with body data
  @Put('/:id')
  async updateItem(@Param('id') id: number, @Body() updateItemDto: ItemDto) {
    return await this.itemsService.updateItem(id, updateItemDto);
  }

  //Delete item after id
  @Delete('/:id')
  async deleteItem(@Param('id') id: number) {
    return await this.itemsService.deleteItem(id);
  }
}
