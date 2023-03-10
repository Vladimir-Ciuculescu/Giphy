import { IsNotEmpty, IsOptional } from 'class-validator';
import { size_enum } from 'src/entities/item.entity';
import { CategoryDto } from './category.dto';

export class ItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  image_link: string;

  @IsNotEmpty()
  material: string;

  @IsNotEmpty()
  size: size_enum;

  @IsOptional()
  serial_number: string;

  @IsOptional()
  lot_number: string;

  @IsOptional()
  categories: CategoryDto[];
}
