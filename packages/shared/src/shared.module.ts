import { Module, Global } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { UsersService } from './services/user.service';
import { ProjectService } from './services/project.service';
import { EncryptionService } from './services/encription.service';

@Global()
@Module({
  providers: [PrismaService, UsersService, ProjectService, EncryptionService],
  exports: [PrismaService, UsersService, ProjectService, EncryptionService],
})
export class SharedModule {}