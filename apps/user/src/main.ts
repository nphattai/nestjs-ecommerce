import { userClient } from '@api/grpc/user';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({ ...userClient });

  app.startAllMicroservices();

  process.on('uncaughtException', (err) => {
    new Logger().error(err);
  });

  const port = process.env.PORT || 4000;

  await app.listen(port).then(() => {
    Logger.log(`User Application is running on port ${port}`, 'User');
  });
}

bootstrap().catch((error) => {
  Logger.error('[User] Error starting application', error);
});
