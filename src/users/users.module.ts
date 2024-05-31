import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TrelloUser } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrelloUser])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
