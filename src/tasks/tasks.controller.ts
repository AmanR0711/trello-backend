import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(':boardId')
  async findOne(
    @Param('boardId') boardId: string,
    @Query('listId') listId: number,
    @Query('taskId') taskId: number,
  ) {
    return await this.tasksService.findOne(boardId, listId, taskId);
  }

  @Get(':boardId/all')
  async findAll(@Param('boardId') boardId: string, @Query('listId') listId: number) {
    return this.tasksService.findAll(boardId, listId);
  }

  @Post(':boardId/create')
  async create(
    @Param('boardId') boardId: string,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ) {
    return await this.tasksService.create(boardId, createTaskDto);
  }

  @Patch(':boardId/update')
  async update(@Param('boardId') boardId: string, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(boardId, updateTaskDto);
  }

  @Delete(':boardId/delete')
  async remove(@Param('boardId') boardId: string, @Body(ValidationPipe) deleteTaskDto: DeleteTaskDto) {
    return await this.tasksService.remove(boardId, deleteTaskDto);
  }
}
