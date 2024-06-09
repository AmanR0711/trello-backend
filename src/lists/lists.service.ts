import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { TrelloListScopes } from './entities/scopes.entity';
import { TrelloList } from './entities/list.entity';
import { BoardsService } from 'src/boards/boards.service';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(TrelloList)
    private readonly listsRepository: Repository<TrelloList>,
    private readonly boardsService: BoardsService,
    @InjectRepository(TrelloListScopes)
    private readonly listScopesRepository: Repository<TrelloListScopes>,
  ) {}

  async create(boardId: string, createListDto: CreateListDto) {
    // Find the board
    const board = await this.boardsService.findOne(boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }

    // Create the list
    const list = await this.listsRepository.create({
      ...createListDto,
      board: board,
    });
    await this.listsRepository.save(list);
    return this.findOne(boardId, list.id);
  }

  async findAll(boardId: string) {
    return await this.listsRepository.find({
      where: { board: { id: boardId } },
    });
  }

  async findOne(boardId: string, id: number) {
    const list = await this.listsRepository.find({
      where: { id, board: { id: boardId } },
    });
    if (!list) {
      throw new NotFoundException('List not found');
    }
    return list[0];
  }

  async update(boardId: string, id: number, updateListDto: UpdateListDto) {
    const list = await this.findOne(boardId, id);
    if (!list) {
      throw new NotFoundException('List not found');
    }
    await this.listsRepository.update(id, {
      ...updateListDto,
    });
    return this.findOne(boardId, id);
  }

  async remove(boardId: string, id: number) {
    const list = await this.findOne(boardId, id);
    if (!list) {
      throw new NotFoundException('List not found');
    }
    await this.listsRepository.remove(list);
  }
}
