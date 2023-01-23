import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ItemSize } from "./item-size.enum";

@Entity('items')
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column('decimal', { precision: 5, scale: 2 })
    price: number;

    @Column()
    image_link: string;

    @Column()
    material: string;

    @Column()
    size: ItemSize;
}