import { IsNotEmpty } from 'class-validator';

export class AssignCategoryDto {
  @IsNotEmpty()
  itemId: number;

  @IsNotEmpty()
  categoryId: string;
}