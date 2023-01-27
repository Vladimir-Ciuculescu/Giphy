import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Items } from './item.entity';

@Entity()
export class Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('text')
  description: string;
}
