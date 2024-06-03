import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

import { TrelloBoard } from './entities/board.entity';
import { TrelloBoardScopes } from './entities/scopes.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TrelloUser } from 'src/users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([TrelloBoard, TrelloBoardScopes, TrelloUser]),
  ],
  controllers: [BoardsController],
  providers: [BoardsService, UsersService],
})
export class BoardsModule {}
