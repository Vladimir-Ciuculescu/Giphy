import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './category.entity';
import { Item_Details } from './item_detail.entity';

export enum size_enum {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

@Entity({ name: 'items'})
export class Items extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('numeric')
  price: number;

  @Column('text')
  image_link: string;

  @Column('text')
  material: string;

  @Column({
    type: 'enum',
    enum: ['small', 'medium', 'large'],
    default: 'small',
  })
  size: size_enum;

  @ManyToMany(() => Categories, (category) => category.items, {
    onDelete: 'CASCADE',
  })
  categories: Categories[];

  @OneToOne(() => Item_Details, { cascade: true})
  @JoinColumn({ name: 'item_id' })
  items_details: Item_Details;
}
