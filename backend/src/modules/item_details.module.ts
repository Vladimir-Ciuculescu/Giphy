import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item_Details } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Item_Details])],
  controllers: [],
  providers: [],
})
export class ItemDetailsModule {}
