import { Controller, Get, Logger } from '@nestjs/common';
import { PrismaService } from 'shared'; 

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private prisma: PrismaService) {}

  @Get()
  async check() {
    this.logger.log('Health check called');
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { 
        status: 'ok', 
        service: process.env.SERVICE_NAME, 
        database: 'connected', 
        timestamp: new Date().toISOString() 
      };
    } catch (error) {
      this.logger.error(`Health check failed: ${error.message}`);
      return { 
        status: 'error', 
        service: process.env.SERVICE_NAME,
        message: error.message, 
        timestamp: new Date().toISOString() 
      };
    }
  }
}