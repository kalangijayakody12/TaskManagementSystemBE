import { Controller, Get, Post, Body, Param, Delete, Request } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // @Roles(Role.admin)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    return this.projectService.createNewProject(createProjectDto, req.user.sub);
  }

  @Get()
  findAll() {
    return this.projectService.findAllProjects();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOneProject(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.removeProject(id);
  }
}
