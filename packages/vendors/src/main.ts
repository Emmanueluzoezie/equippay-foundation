import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = process.env.VENDOR_PORT  || 3008;
  
  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.log('SIGTERM received. Closing HTTP server.');
    await app.close();
    logger.log('HTTP server closed.');
    process.exit(0);
  });

  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Health check available at: http://localhost:${port}/health`);
}
bootstrap();
