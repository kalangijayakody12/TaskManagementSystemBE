import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel:Model<TaskDocument>) {}

  async createNewTask(createTaskDto: CreateTaskDto, userId:string ): Promise<Task> {
    const newTaskData = {...createTaskDto,taskActivityHistory:[{
      status:"Not started",
      changedAt:new Date(),
      changedBy:userId
    }] };
    const newTask = new this.taskModel(newTaskData);  
    console.log("New task: ", newTask);
    await newTask.save();
    return newTask;
  }

  findAllTasks() {
    return this.taskModel.find().populate('taskAssignedMembers').exec();
  }

  async findAllProjectTasks(projectId:string) :Promise<Task[]>{
    const tasks = await this.taskModel.find({projectBelong:projectId}).exec();
    console.log("tasks: ", tasks);
    if(tasks.length ===0){
      return [];
    }
    return tasks;
  }

  async findOneTask(id: string) {
    const task = await this.taskModel.findById(id).populate('taskAssignedMembers').populate('taskActivityHistory.changedBy').exec();
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  }

  async removeTask(id: string) {
    const deletedTask = this.taskModel.findByIdAndDelete(id);
    if(!deletedTask) {
      throw new Error(`Task with id ${id} not found`);
    }
    return deletedTask;
  }

  async updateTask(id:string, updateTaskDto:any, userId:string) {
    // const existingTask = await this.taskModel.findById(id).exec();

    // if(existingTask?.taskStatus !== updateTaskDto.status ) {
    //   updateTaskDto.taskActivityHistory.push({
    //     status: updateTaskDto.status,
    //     changedAt: new Date(),
    //     changedBy: userId
    //   })
    //   const updateTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto);

    //   if(!updateTask) {
    //     throw new Error(`Task with id ${id} not found`);
    //   }
    //   return updateTask;
    // }

    // else {

    // }

      const existingTask = await this.taskModel.findById(id);

      if (!existingTask) {
        throw new Error(`Task with id ${id} not found`);
      }

      if (existingTask.taskStatus !== updateTaskDto.taskStatus) {

        existingTask.taskActivityHistory.push({
          status: updateTaskDto.taskStatus,
          changedAt: new Date(),
          changedBy: userId
        });
      }

      existingTask.taskStatus =
        updateTaskDto.taskStatus ?? existingTask.taskStatus;

      existingTask.taskAssignedMembers =
        updateTaskDto.taskAssignedMembers ?? existingTask.taskAssignedMembers;

      await existingTask.save();

  return existingTask;
    
  }
}
