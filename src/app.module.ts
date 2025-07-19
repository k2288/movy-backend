import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ELASTIC_SERVICE, IElasticService } from './elastic/interfaces/elastic-service.interface';
import { ElasticModule } from './elastic/elastic.module';
import { TypeormLogger } from './logger/typeorm-logger.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { BullModule } from '@nestjs/bull';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'fa',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new AcceptLanguageResolver()],

    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`
    }),
    // ThrottlerModule.forRoot({
    //   storage: new ThrottlerStorageRedisService({
    //     host: process.env.REDIS_HOST,
    //     port: +process.env.REDIS_PORT,
    //     password: process.env.REDIS_PASSWORD,
    //     db:8
    //   }),
    //   throttlers: [{
    //     ttl: +process.env.THROTTLE_TTL,//miliseconds
    //     limit: +process.env.THROTTLE_LIMIT,

    //   }]
    // }),
    ElasticModule,
    TypeOrmModule.forRootAsync({
      useFactory: (elasticService: IElasticService) => ({
        type: 'mysql',
        keepConnectionAlive: true,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [],
        logging: process.env.DB_LOGGING === 'true',
        autoLoadEntities: true,
        synchronize: process.env.DB_SYNCRONIZE === 'true',
        maxQueryExecutionTime: +process.env.DB_MAX_QUERY_EXECUTATION_TIME,
        logger: new TypeormLogger(elasticService),
        extra: {
          connectionLimit: +process.env.DB_CONNECTION_LIMIT || 1000,
        },
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        cache: {
          type: "redis",
          options: {
            socket: {
              host: process.env.REDIS_HOST,
              port: +process.env.REDIS_PORT,
            },
            password: process.env.REDIS_PASSWORD,
          },
          duration: 300000 // 5 minutes
        },
      }),
      inject: [ELASTIC_SERVICE]
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
          },
          database: +process.env.REDIS_DB,
          password: process.env.REDIS_PASSWORD
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 0
        };
      },
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
      },
    }),
    ScheduleModule.forRoot(),
    UserModule,
    TaskModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // }
  ],
})
export class AppModule { }
