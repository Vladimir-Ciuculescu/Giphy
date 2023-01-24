import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Items } from './item.entity';

@Entity({ name: 'item_details' })
export class Item_Details extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  serial_number: string;

  @Column('text')
  lot_number: string;

}
