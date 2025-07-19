import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as fs from 'fs';
import { AllExceptionsFilter } from './filters/AllExceptionsFilter';
import { LOG_ERROR } from './elastic/persist/indices';
import { Client } from '@elastic/elasticsearch';
import * as cookieParser from 'cookie-parser';
import { I18nService, I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("/api")

  const config = new DocumentBuilder()
    .setTitle('Backend Api')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build();

  app.use(cookieParser());
  app.disable('x-powered-by')
  //authorize swagger page
  if (process.env.NODE_ENV === 'production') {
    // authorize(app)
  }

  app.use(helmet({
    hsts: false
  }))

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.set("trust proxy", true)

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));

  
  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      validateCustomDecorators: true,
      validationError: { target: false },
    })
  )
  
  // This is important for class-validator to use NestJS's DI container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const i18nService = app.get(I18nService);
  app.useGlobalFilters(new AllExceptionsFilter(i18nService as I18nService<Record<string, unknown>>))
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
  });

  const elasticClient = new Client({
    node: process.env.ELASTIC_HOST,
    auth: {
      username: process.env.ELATIC_USERNAME,
      password: process.env.ELASTIC_PASSWORD,
    }
  })

  process.on("unhandledRejection", (error: Error) => {
    console.log(error)
    elasticClient.index(
      {
        index: LOG_ERROR,
        body: {
          message: error.message,
          stack: error.stack,
          name: error.name,
          timestamp: new Date().toISOString(),
        }
      }
    );
  })

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
