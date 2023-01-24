import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsController } from 'src/controllers/items.controller';
import { Items } from 'src/entities';
import { ItemsService } from 'src/services/items.service';
import { ItemDetailsModule } from './item_details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Items]),
    ItemDetailsModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
