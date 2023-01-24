import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemDetailsController } from 'src/controllers/item_details.controller';
import { Item_Details } from 'src/entities';
import { ItemDetailsService } from 'src/services/item_details.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item_Details])],
  controllers: [ItemDetailsController],
  providers: [ItemDetailsService],
  exports: [ItemDetailsService],
})
export class ItemDetailsModule {}
