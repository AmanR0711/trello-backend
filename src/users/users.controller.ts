import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Responsible for T.R.E.L.L.O User CRUD operations
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Creates a new T.R.E.L.L.O User
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
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
}
