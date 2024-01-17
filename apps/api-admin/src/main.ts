import { CustomExceptionFilter } from '@common/error';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new CustomExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const globalPrefix = 'admin';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;

  await app.listen(port);
  Logger.log(`🚀 API Admin is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
