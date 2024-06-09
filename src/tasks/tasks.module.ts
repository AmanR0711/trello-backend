import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrelloTask } from './entities/task.entity';
import { ListsModule } from 'src/lists/lists.module';
import { BoardsModule } from 'src/boards/boards.module';
import { ListsService } from 'src/lists/lists.service';
import { BoardsService } from 'src/boards/boards.service';
import { TrelloListScopes } from 'src/lists/entities/scopes.entity';
import { TrelloBoard } from 'src/boards/entities/board.entity';
import { TrelloBoardScopes } from 'src/boards/entities/scopes.entity';
import { TrelloList } from 'src/lists/entities/list.entity';
import { TrelloUser } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrelloTask,
      TrelloBoard,
      TrelloBoardScopes,
      TrelloList,
      TrelloListScopes,
      TrelloUser,
    ]),
    BoardsModule,
    ListsModule,
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, BoardsService, ListsService, UsersService],
})
export class TasksModule {}
