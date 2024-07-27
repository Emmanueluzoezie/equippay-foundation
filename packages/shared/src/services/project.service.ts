import { Injectable } from '@nestjs/common';
import { Project } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from './user.service';
import { PrismaService } from './prisma.service';
import { EncryptionService } from './encription.service';
import { CreateProjectDto } from 'src/dto/project.dto';

@Injectable()
export class ProjectService {
    constructor (
        private user: UsersService,
        private prisma: PrismaService,
        private encryptionService: EncryptionService
    ){}

    async createProject(data: CreateProjectDto): Promise<Project> {
        const apiKey = uuidv4()
        // encrypting the api key
        const encryptedApiKey = this.encryptionService.encrypt(apiKey);

        const user = await this.user.getUserByEmail(data.email)
        if(!user){
            throw new Error("User is not found")
        }

        const project = await this.prisma.project.create({
            data: {
                name: data.name,
                description: data.description,
                apiKey: encryptedApiKey,
                userId: user.id
            }
        })
        return project
    }

    async getAllUserProject(email: string): Promise<Project[]>{

        const user = await this.user.getUserByEmail(email)
        if(!user){
            throw new Error("User is not found")
        }

        const projects = await this.prisma.project.findMany({
            where: {
                userId: user.id
            }
        })

        return projects.map(project => ({
            ...project,
            apiKey: this.encryptionService.decrypt(project.apiKey),
          }));
    }

    // get Project info using the API KEY
    async getProject(apiKey: string): Promise<Project>{
        const project = await this.prisma.project.findFirst({
            where: {
                apiKey: this.encryptionService.encrypt(apiKey)
            }
        })

        return {
            ...project,
            // decrypting the encrypted api key
            apiKey: this.encryptionService.decrypt(project.apiKey),
          };
    }
}
