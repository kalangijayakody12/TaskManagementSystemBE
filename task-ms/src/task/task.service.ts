import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel:Model<TaskDocument>) {}

  async createNewTask(createTaskDto: CreateTaskDto ): Promise<Task> {
    const newTask = new this.taskModel(createTaskDto);
    await newTask.save();
    return newTask;
  }

  findAllTasks() {
    return this.taskModel.find().exec();
  }

  async findAllProjectTasks(projectId:string) :Promise<Task[]>{
    const tasks = await this.taskModel.find({projectBelong:projectId}).exec()
    if(tasks.length ===0){
      return [];
    }
    return tasks;
  }

  async findOneTask(id: string) {
    const task = await this.taskModel.findById(id);
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
