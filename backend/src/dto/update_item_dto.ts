import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from './category.dto';
import { ItemDto } from './item.dto';

export class UpdateItemDto {
  @IsNotEmpty()
  item: ItemDto;

  @IsNotEmpty()
  categories: CategoryDto[];
}
