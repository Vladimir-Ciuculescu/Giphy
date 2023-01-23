import { IsNotEmpty } from 'class-validator';
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
}
