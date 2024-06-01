import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TrelloTheme } from './entities/user.entity';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';

// Responsible for T.R.E.L.L.O User CRUD operations
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  // Creates a new T.R.E.L.L.O User
  @Post('create')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    // if theme is null -> set to Light
    if (!createUserDto.theme) {
      createUserDto.theme = TrelloTheme.light;
    }

    // if no avatarUrl -> set to default
    if (!createUserDto.avatarUrl) {
      createUserDto.avatarUrl = `${this.configService.get<string>('SERVER_URL')}/public/avatar/default.jpg`;
    }

    return this.usersService.create(createUserDto);
  }

  // Retrieves a T.R.E.L.L.O User having a specific email
  // Each T.R.E.L.L.O User has a unique email
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  // Updates a T.R.E.L.L.O User having a specific username
  // Effectively, a route to handle user preferences
  @Patch('update/:username')
  async update(
    @Param('username') username: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const res = await this.usersService.update(username, updateUserDto);
    return { message: 'User updated successfully', data: res };
  }

  // Danger zone:
  // If a T.R.E.L.L.O User is deleted,
  // all associated boards and lists are deleted
  @Delete('delete/:username')
  async remove(@Param('username') username: string) {
    const res = await this.usersService.remove(username);
    if (res.affected === 0) {
      throw new NotFoundException({
        message: `User with username ${username} not found`,
      });
    } else {
      return { message: 'User deleted successfully' };
    }
  }

  // Profile picture uploader
  @Post('avatar/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/avatars',
        filename: (req, file, callback) => {
          if (!req.query.username) {
            callback(new Error('Username is required'), '');
          } else {
            if (file.mimetype.match(/image\/(png|jpeg|jpg)/)) {
              // Filename: username + file extension
              // e.g. 'john_doe.png'
              const filename: string = `${req.query.username}.${file.originalname.split('.').pop()}`;
              callback(null, filename);
            } else {
              callback(new Error('Invalid file type'), '');
            }
          }
        },
      }),
    }),
  )
  async uploadAvatar(
    @UploadedFile(
      // Max file size: 5MB,
      // Allowed file types: JPEG, JPG, PNG
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)' })
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    avatar: Express.Multer.File,
    @Query('username') username: string,
  ) {
    const validUsername = await this.usersService.findOne(username);
    if (!validUsername) {
      throw new NotFoundException({ message: 'Invalid username' });
    } else {
      await this.usersService.update(username, {
        avatarUrl: `${this.configService.get<string>('SERVER_URL')}/public/avatars/${avatar.filename}`,
      });
      return this.usersService.uploadAvatar(avatar);
    }
  }
}
