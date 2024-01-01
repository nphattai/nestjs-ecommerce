import { AppEnv, IBaseConfig } from '@domain/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class PGPrimaryConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const host = this.configService.getOrThrow<string>('db.primaryHost');
    const port = this.configService.getOrThrow<number>('db.port');
    const username = this.configService.getOrThrow<string>('db.username');
    const password = this.configService.getOrThrow<string>('db.password');
    const database = this.configService.getOrThrow<string>('db.database');
    const isTest = this.configService.getOrThrow<IBaseConfig['app']['env']>('app.env') === AppEnv.TEST;

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      autoLoadEntities: true,
      logging: isTest,
      synchronize: isTest,
    };
  }
}
