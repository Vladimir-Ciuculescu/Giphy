import { IsNotEmpty, IsOptional } from 'class-validator';

export class SearchParamsDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  serial_number: string;

  @IsNotEmpty()
  @IsOptional()
  lot_number: string;
}
