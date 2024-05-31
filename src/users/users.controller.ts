import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TrelloTheme } from './entities/user.entity';
import { diskStorage } from 'multer';

// Responsible for T.R.E.L.L.O User CRUD operations
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Creates a new T.R.E.L.L.O User
  @Post('create')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    // if theme is null -> set to Light
    if (!createUserDto.theme) {
      createUserDto.theme = TrelloTheme.light;
    }

    // if no avatarUrl -> set to default
    if (!createUserDto.avatarUrl) {
      createUserDto.avatarUrl = "default.jpg";
    }

    return this.usersService.create(createUserDto);
  }

  // Retrieves a T.R.E.L.L.O User having a specific username
  // Each T.R.E.L.L.O User has a unique username
  @Get(':username')
  findOne(@Param('username') id: string) {
    // return this.usersService.findOne(+id);
  }

  // Updates a T.R.E.L.L.O User having a specific username
  // Effectively, a route to handle user preferences
  @Patch(':username')
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.usersService.update(+username, updateUserDto);
  }

  // Danger zone: 
  // If a T.R.E.L.L.O User is deleted, 
  // all associated boards and lists are deleted
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // Profile picture uploader
  @Post("avatar/upload")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./public/avatars",
      filename: (req, file, callback) => {
        if (!req.query.username) {
          callback(new Error("Username is required"), "");
        } else {
          console.log(req.query);
          console.log(file);
          // Filename: username + file extension
          // e.g. 'john_doe.png'
          const filename: string = `${req.query.username}.${file.originalname.split('.').pop()}`;
          callback(null, filename);
        }
      }
    }),
  }))
  uploadAvatar(@UploadedFile(
    // Max file size: 5MB,
    // Allowed file types: JPEG, JPG, PNG
    new ParseFilePipeBuilder()
      .addFileTypeValidator({ fileType: '.(png|jpeg|jpg)', })
      .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
      .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY })

  ) avatar: Express.Multer.File) {
    return this.usersService.uploadAvatar(avatar);
  }
}
