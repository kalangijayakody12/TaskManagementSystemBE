import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createNewTask(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAllTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskService.findOneTask(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskService.removeTask(id);
  }
}
