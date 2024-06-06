import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('lists')
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Post(':boardId/create')
  async create(boardId: string, @Body() createListDto: CreateListDto) {
    return await this.listsService.create(boardId, createListDto);
  }

  @Get(':boardId')
  async findAll(boardId: string) {
    return await this.listsService.findAll(boardId);
  }

  @Get(':boardId/:id')
  async findOne(@Param('boardId') boardId: string, @Param('id') id: string) {
    const lists = await this.listsService.findAll(boardId);
    return lists.find((list) => list.id === +id);
  }

  @Patch(':boardId/:id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    return await this.listsService.update(boardId, +id, updateListDto);
  }

  @Delete(':boardId/:id')
  async remove(@Param('boardId') boardId: string, @Param('id') id: string) {
    await this.listsService.remove(boardId, +id);
    return { message: 'List deleted successfully' };
  }
}
