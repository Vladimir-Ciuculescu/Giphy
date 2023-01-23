import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Items } from './item.entity';

@Entity()
export class Item_Details {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serial_number: string;

  @Column()
  lot_number: string;

  @OneToOne(() => Items, (items) => items.items_details)
  @JoinColumn({ name: 'item_id' })
  items: Items;
}
