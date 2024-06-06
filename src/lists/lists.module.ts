import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TrelloListScopes } from './entities/scopes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloList } from './entities/list.entity';
import { TrelloBoard } from 'src/boards/entities/board.entity';
import { BoardsModule } from 'src/boards/boards.module';
import { BoardsService } from 'src/boards/boards.service';
import { TrelloBoardScopes } from 'src/boards/entities/scopes.entity';
import { UsersService } from 'src/users/users.service';
import { TrelloUser } from 'src/users/entities/user.entity';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forFeature([TrelloList, TrelloBoard, TrelloBoardScopes, TrelloListScopes, TrelloUser]),
  ],
  controllers: [ListsController],
  providers: [ListsService, BoardsService, UsersService],
})
export class ListsModule {}
