import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/createProject.dto';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel:Model<ProjectDocument>) {}

  async createNewProject(createProjectDto: CreateProjectDto, userId: object) {
    console.log(createProjectDto);

    const newProject = new this.projectModel({
      ...createProjectDto,
      projectOwner: userId
    } );
    await newProject.save();
    return newProject;
  }

  async findAllProjects() {
    return await this.projectModel.find().exec();  
  }

  async findOneProject(id: number) {
    const project = await this.projectModel.findOne({projectId:id});
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    return project;
  }

  removeProject(id: number) {
    const deletedProject = this.projectModel.findOneAndDelete({projectId:id});
    if (!deletedProject) {
      throw new Error(`Project with id ${id} not found`);
    }
    return deletedProject;
  }
}
