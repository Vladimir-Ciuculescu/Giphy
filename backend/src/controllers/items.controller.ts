import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ItemDto } from 'src/dto/item.dto';
import { SearchParamsDto } from 'src/dto/search_item.dto';
import { AssignCategoryDto } from 'src/dto/assign_category.dto'
import { ItemsService } from 'src/services/items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  //Get all items
  @Get()
  async getItems(@Query(ValidationPipe) searchParamsDto: SearchParamsDto) {
    const items = await this.itemsService.getItems(searchParamsDto);
    return items;
  }

  //Get item by id
  @Get('/:id')
  async getItemById(@Param('id') id: number) {
    const item = await this.itemsService.getItemById(id);
    return item;
  }

  //Get all categories for an item with ID
  @Get('/:id/categories')
  async getItemCategories(@Param('id') id: number) {
    return await this.itemsService.getItemCategories(id);
  }

  //Add a new item with body data
  @Post('/add')
  @UsePipes(ValidationPipe)
  async addItem(@Body() addItemDto: ItemDto) {
    await this.itemsService.addItem(addItemDto);
  }

   //Add a category to item with IDs
  @Put()
  @UsePipes(ValidationPipe)
  async assignItemCategory(@Body() assignCategoryDto : AssignCategoryDto) {
    await this.itemsService.assignItemCategory(assignCategoryDto);
  }

  //Update an item after id with body data
  @Put('/:id')
  async updateItem(@Param('id') id: number, @Body() updateItemDto: ItemDto) {
    await this.itemsService.updateItem(id, updateItemDto);
  }

  //Delete item after id
  @Delete('/:id')
  async deleteItem(@Param('id') id: number) {
    await this.itemsService.deleteItem(id);
  }
}
