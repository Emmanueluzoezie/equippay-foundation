import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { EncryptionService, PrismaService, ProjectService, UsersService } from 'shared';

@Module({
    controllers: [ProjectController],
})
export class ProjectModule {}
