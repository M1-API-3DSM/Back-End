import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Post()
  async create(@Body() itemData: Partial<Item>): Promise<Item> {
    return this.itemService.create(itemData);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() itemData: Partial<Item>,
  ): Promise<Item> {
    return this.itemService.update(id, itemData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.itemService.remove(id);
  }
}
