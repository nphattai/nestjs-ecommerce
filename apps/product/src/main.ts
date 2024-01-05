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

  const port = process.env.PORT || 4002;

  await app.listen(port).then(() => {
    Logger.log(`Product Application is running on port ${port}`, 'Product');
  });
}

bootstrap().catch((error) => {
  Logger.error('[Product] Error starting application', error);
});
