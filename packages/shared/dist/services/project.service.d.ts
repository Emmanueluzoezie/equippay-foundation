import { Project } from '@prisma/client';
import { UsersService } from './user.service';
import { PrismaService } from './prisma.service';
import { EncryptionService } from './encription.service';
import { CreateProjectDto } from 'src/dto/project.dto';
interface ProjectWithDecryptionStatus extends Project {
    decryptionStatus: 'SUCCESS' | 'FAILED';
}
export declare class ProjectService {
    private user;
    private prisma;
    private encryptionService;
    constructor(user: UsersService, prisma: PrismaService, encryptionService: EncryptionService);
    createProject(data: CreateProjectDto): Promise<Project>;
    getAllUserProject(apiKey: string, email: string): Promise<ProjectWithDecryptionStatus[]>;
    getProject(apiKey: string): Promise<Project>;
}
export {};
