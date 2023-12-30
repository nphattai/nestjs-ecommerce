import { productClient } from '@api/grpc/product';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({ ...productClient });

  app.startAllMicroservices();

  process.on('uncaughtException', (err) => {
    new Logger().error(err);
  });

  await app.listen(3001).then(() => {
    Logger.log('Application is running', 'Product');
  });
}

bootstrap().catch((error) => {
  Logger.error('[Product] Error starting application', error);
});
