import { IsNotEmpty } from "class-validator";
import { ItemSize } from "../item-size.enum";

export class AddItemDto {
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    image_link: string;

    @IsNotEmpty()
    material: string;

    @IsNotEmpty()
    size: ItemSize;
}