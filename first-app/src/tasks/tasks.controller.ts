import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '../../generated/prisma/client';
import { PaginatorDto } from 'src/common/dto/pagination.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAllTasks(@Query() paginatorDto: PaginatorDto) {
    return this.taskService.findAll(paginatorDto);
  }

  @Get(':id')
  async findTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.findOneTask(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.taskService.delete(id);
  }
}
