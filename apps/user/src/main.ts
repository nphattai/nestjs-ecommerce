import { userClient } from '@api/grpc/user';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcErrorInterceptor } from '@util/grpc';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, { ...userClient });

  app.useGlobalInterceptors(new GrpcErrorInterceptor());

  process.on('uncaughtException', (err) => {
    new Logger().error(err);
  });

  await app.listen().then(() => {
    Logger.log(`User microservice is running`);
  });
}

bootstrap().catch((error) => {
  Logger.error('[User] Error starting application', error);
});
