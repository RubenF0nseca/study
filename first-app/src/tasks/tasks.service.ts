import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatorDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(paginatorDto: PaginatorDto = {}) {
    const { limit = 10, offset = 0 } = paginatorDto;

    return await this.prisma.task.findMany({
      take: limit,
      skip: offset,
    });
  }

  async findOneTask(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        completed: false,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOneTask(id);

    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async delete(id: number) {
    await this.findOneTask(id);

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Task deleted successfully' };
  }
}
