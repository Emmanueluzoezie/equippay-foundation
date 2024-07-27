import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { PrismaService, UsersService } from 'shared';

@Module({
  controllers: [UsersController],
})
export class UserModule {}