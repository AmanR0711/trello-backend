import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { TrelloBoard } from './entities/board.entity';
import { Repository } from 'typeorm';
import { TrelloBoardScope, TrelloBoardScopes } from './entities/scopes.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateScopeDto } from './dto/update-scope.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(TrelloBoard)
    private readonly boardRepository: Repository<TrelloBoard>,
    @InjectRepository(TrelloBoardScopes)
    private readonly boardScopesRepository: Repository<TrelloBoardScopes>,
    private readonly userService: UsersService,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    // Check if username is valid
    const user = await this.userService.findOne(createBoardDto.username);

    if (!user) {
      throw new NotFoundException(
        `User with username ${createBoardDto.username} not found`,
      );
    }
    const res = await this.boardRepository.create({
      name: createBoardDto.name,
      creator: user,
      bgColor: createBoardDto.bgColor,
      description: createBoardDto.description,
    });
    await this.boardRepository.save(res);
    // Create a private scope for the board by default
    const scope = await this.boardScopesRepository.create({
      boardId: res.id,
      scope: TrelloBoardScope.readWrite,
      username: createBoardDto.username,
      board: res,
    });
    await this.boardScopesRepository.save(scope);
    return await this.findOne(res.id);
  }

  async findAll(username: string) {
    const res = await this.boardRepository.find({
      where: { creator: { username } },
      relations: { creator: true, scopes: true },
    });

    console.log(res);
    return res;
  }

  async findOne(id: string) {
    const res = await this.boardRepository.findOne({
      where: { id: id },
      relations: { creator: true, scopes: true },
    });

    // Invalid board id
    if (!res) {
      throw new NotFoundException('Board with this ID not found');
    }
    return res;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    await this.boardRepository.update(id, updateBoardDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.boardRepository.delete(id);
  }

  async updateScopes(id: string, updateScopeDto: UpdateScopeDto) {
    // find board
    const board = await this.findOne(id);
    if (!board) {
      throw new NotFoundException('Board with this ID not found');
    }

    if (updateScopeDto.scope == TrelloBoardScope.noaccess) {
      // Remove the scope
      console.log('Deleting scope');
      await this.boardScopesRepository.delete({
        board: { id },
        username: updateScopeDto.username,
      });
      return;
    }

    const res = await this.boardScopesRepository.find({
      where: { board: { id: id }, username: updateScopeDto.username },
    });
    if (res.length == 0) {
      // New scope
      const newScope = await this.boardScopesRepository.create({
        ...updateScopeDto,
        board: { id },
      });
      await this.boardScopesRepository.save(newScope);
    } else {
      await this.boardScopesRepository.save({
        boardId: id,
        username: updateScopeDto.username,
        scope: updateScopeDto.scope,
      });
    }
  }
}
