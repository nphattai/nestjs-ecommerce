import { userClient } from '@api/grpc/user';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    ...userClient,
  });

  process.on('uncaughtException', (err) => {
    new Logger().error(err);
  });

  await app.listen().then(() => {
    Logger.log('Application is running', 'User');
  });
}

bootstrap().catch((error) => {
  Logger.error('[User] Error starting application', error);
});
