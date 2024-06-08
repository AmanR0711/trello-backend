import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ValidationPipe } from '@nestjs/common';
import { Server } from 'socket.io';

import { UsersService } from './users.service';
import { UsersGatewayDto } from './dto/users-gateway.dto';

// To check if username is unique
@WebSocketGateway({ namespace: 'users', cors: { origin: '*' } })
export class UsersGateway {
  @WebSocketServer()
  private wsServer: Server;

  constructor(private readonly usersService: UsersService) {}

  // Checks if username is unique
  // A better method to check if username is unique than continuously polling the server :)
  @SubscribeMessage('username')
  async handleMessage(@MessageBody(ValidationPipe) body: UsersGatewayDto) {
    if (body.username.length < 7) {
      // 7 because.... THALA
      return this.wsServer.emit('username', {
        error: true,
        message: 'Username must be at least 7 characters long!',
      });
    }
    const user = await this.usersService.findOne(body.username);
    const res =
      user !== null
        ? {
            error: true,
            message: 'This username already exists!',
          }
        : {
            error: false,
            message: `Username '${body.username}' is available!`,
          };
    return this.wsServer.emit('username', res);
  }
}
