import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { RetrieveAllBoardsDto } from './dto/retrieve-all-boards.dto';

import { BoardsService } from './boards.service';
import { UpdateScopeDto } from './dto/update-scope.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post('create')
  async create(@Body(ValidationPipe) createBoardDto: CreateBoardDto) {
    return await this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll(@Body(ValidationPipe) body: RetrieveAllBoardsDto) {
    return await this.boardsService.findAll(body.username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return await this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.boardsService.remove(id);
      return { message: 'Board removed successfully' };
    } catch (e) {
      return { message: 'Board does not exist' };
    }
  }

  @Post(':id')
  async updateScope(@Param('id') id: string, @Body(ValidationPipe) updateScopeDto: UpdateScopeDto) {
    await this.boardsService.updateScopes(id, updateScopeDto);
    return { message: 'Scope updated successfully' };
  }
}
