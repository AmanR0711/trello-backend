import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TrelloUser } from './entities/user.entity';
import { UsersGateway } from './users.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([TrelloUser])],
  controllers: [UsersController],
  providers: [UsersService, UsersGateway],
})
export class UsersModule {}
