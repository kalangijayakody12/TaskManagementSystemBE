import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel:Model<TaskDocument>) {}

  async createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    await newTask.save();
    return newTask;
  }

  findAllTasks() {
    return this.taskModel.find().exec();
  }

  async findOneTask(id: number) {
    const task = await this.taskModel.findOne({taskId: id});
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  }

  async removeTask(id: number) {
    const deletedTask = this.taskModel.findOneAndDelete({taskId: id});
    if(!deletedTask) {
      throw new Error(`Task with id ${id} not found`);
    }
    return deletedTask;
  }
}
