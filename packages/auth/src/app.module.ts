import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService, SharedModule } from 'shared';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [UserModule, ProjectModule, SharedModule],
  providers: [PrismaService],
})
export class AppModule {}
