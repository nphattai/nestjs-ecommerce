import { productClient } from '@api/grpc/product';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GrpcErrorInterceptor } from '@util/grpc';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, { ...productClient });

  app.useGlobalInterceptors(new GrpcErrorInterceptor());

  process.on('uncaughtException', (err) => {
    new Logger().error(err);
  });

  await app.listen().then(() => {
    Logger.log(`Product microservice is running`);
  });
}

bootstrap().catch((error) => {
  Logger.error('[Product] Error starting application', error);
});
