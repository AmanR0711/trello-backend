import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrelloTask } from './entities/task.entity';
import { BoardsService } from 'src/boards/boards.service';
import { ListsService } from 'src/lists/lists.service';
import { DeleteTaskDto } from './dto/delete-task.dto';

@Injectable()
export class TasksService {
  
  constructor(
    private readonly boardService: BoardsService,
    private readonly listService: ListsService,
    @InjectRepository(TrelloTask)
    private readonly tasksRepository: Repository<TrelloTask>,
  ) {}
  
  async create(boardId: string, createTaskDto: CreateTaskDto) {
    // Find the board and list by ID
    const board = await this.boardService.findOne(boardId);
    if(!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }
    const list = await this.listService.findOne(boardId, createTaskDto.listId);
    if(!list) {
      throw new NotFoundException(`List with ID ${createTaskDto.listId} not found`);
    }
    const task = await this.tasksRepository.create({
      ...createTaskDto,
      list,
      completed: false,
    });
    await this.tasksRepository.insert(task);
    return task;
  }

  async findAll(boardId: string, listId: number) {
    // Find the board and list by ID
    const board = await this.boardService.findOne(boardId);
    if(!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }
    const list = await this.listService.findOne(boardId, listId);
    if(!list) {
      throw new NotFoundException(`List with ID ${listId} not found`);
    }
    return await this.tasksRepository.find({
      where: { list: { id: listId, board: { id: boardId } } },
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(boardId: string, listId: number, taskId: number) {
    // Find the board and list by ID
    const board = await this.boardService.findOne(boardId);
    if(!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }
    const list = await this.listService.findOne(boardId, listId);
    if(!list) {
      throw new NotFoundException(`List with ID ${listId} not found`);
    }
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, list: { id: listId, board: { id: boardId } } }
    });
    return task; 
  }

  async update(boardId: string, updateTaskDto: UpdateTaskDto) {
    // Find the board and list by ID
    const board = await this.boardService.findOne(boardId);
    if(!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }
    const list = await this.listService.findOne(boardId, updateTaskDto.listId);
    if(!list) {
      throw new NotFoundException(`List with ID ${updateTaskDto.listId} not found`);
    }
    const task = await this.tasksRepository.update(updateTaskDto.taskId, {
      list: { id: updateTaskDto.listId, board: { id: boardId } },
      completed: updateTaskDto.completed,
      title: updateTaskDto.title,
      description: updateTaskDto.description,
    });
    return await this.findOne(boardId, updateTaskDto.listId, updateTaskDto.taskId);
  }

  async remove(boardId: string, deleteTaskDto: DeleteTaskDto) {
    // Find the board and list by ID
    const board = await this.boardService.findOne(boardId);
    if(!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }
    const list = await this.listService.findOne(boardId, deleteTaskDto.listId);
    if(!list) {
      throw new NotFoundException(`List with ID ${deleteTaskDto.listId} not found`);
    }
    const task = await this.tasksRepository.findOne({
      where: { id: deleteTaskDto.taskId, list: { id: deleteTaskDto.listId, board: { id: boardId } } }
    });
    if(!task) {
      throw new NotFoundException(`Task with ID ${deleteTaskDto.taskId} not found`);
    }
    await this.tasksRepository.delete(deleteTaskDto.taskId);
    return { message: 'Task deleted successfully' }
  }
}
