import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health.controller';
import { PrismaService, SharedModule } from 'shared';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../../database/.env'),
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
