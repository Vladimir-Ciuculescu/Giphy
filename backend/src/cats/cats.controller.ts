import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Cat, CatsService } from './cats.service';

class createCatDto {
  name: string;
  age: number;
  breed: string;
}

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async createCat(@Body() cat: createCatDto) {
    this.catsService.create(cat);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.retrieveAll();
  }
}
