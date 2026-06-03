import { Controller, Get, Post, Body, Param, Delete, Request, Put, Patch } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.taskService.createNewTask(createTaskDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.taskService.findAllTasks();
  }

  @Get('project/:projectId')
  findAllProjectTasks(@Param('projectId') projectId: string) {
    return this.taskService.findAllProjectTasks(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOneTask(id);
  }

  @Patch(':id')
  updateTaskDetails(@Param('id') id:string, @Body() updateTaskDto:any, @Request() req){
    return this.taskService.updateTask(id, updateTaskDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.removeTask(id);
  }
}
