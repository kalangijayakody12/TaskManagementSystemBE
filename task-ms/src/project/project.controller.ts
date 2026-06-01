import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectService.createNewProject(createProjectDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.projectService.findAllProjects();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.projectService.findOneProject(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.projectService.removeProject(id);
  }
}
