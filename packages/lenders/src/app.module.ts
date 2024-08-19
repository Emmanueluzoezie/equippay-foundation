import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PrismaService } from 'shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../../database/.env'),
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [PrismaService ],
})
export class AppModule {}
