import { IsNotEmpty, IsOptional } from 'class-validator';
import { size_enum } from 'src/entities/item.entity';

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

  @IsNotEmpty()
  @IsOptional()
  serial_number: string;

  @IsNotEmpty()
  @IsOptional()
  lot_number: string;
}
