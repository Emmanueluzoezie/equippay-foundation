import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Project } from '@prisma/client';
import { CreateProjectDto, ProjectService } from 'shared';

@Controller('api/project')
export class ProjectController {
    constructor (private readonly projectService: ProjectService){}

    @Post()
    async addProject(@Body() data: CreateProjectDto): Promise<Project | null >{

        const project = await this.projectService.createProject(data)
        return project
    }

    @Get()
    async getUserProjects(@Query("email") email: string):Promise<Project[]>{

        const projects = await this.projectService.getAllUserProject(email)
        return projects
    }
}
