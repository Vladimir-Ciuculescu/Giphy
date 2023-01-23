import { IsNotEmpty } from 'class-validator';

export class ItemDetailsDto {
  @IsNotEmpty()
  serial_number: string;

  @IsNotEmpty()
  lot_number: string;
}
