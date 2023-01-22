import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { AddItemDto } from './dto/add-item.dto';
import { Item } from './item.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private itemService: ItemsService) { }
    
    @Get()
    getItems(): Promise<Item[]> {
        return this.itemService.getItems();
    }

    @Get('/:id')
    getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item> {
        return this.itemService.getItemById(id);
    }

    @Post()
    addItem(@Body(ValidationPipe) addItemDto: AddItemDto): Promise<Item> {
        return this.itemService.addItem(addItemDto);
    }

    @Patch('/:id')
    updateItem(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) addItemDto: AddItemDto,
    ) {
        return this.itemService.updateItem(id, addItemDto);
    }    

    @Delete('/:id')
    deleteItem(@Param('id', ParseIntPipe) id: number): Promise<Item> {
        return this.itemService.deleteItem(id);
    }
}
