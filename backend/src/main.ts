import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import {Transport} from "@nestjs/microservices";
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [,
      `http://${process.env.HOST}/api`,
      `http://${process.env.HOST}`,
      'http://10.11.9.3',
      'http://10.11.9.3',
      `http://${process.env.HOST}`],
      credentials: true
  })
  // const microservice = app.connectMicroservice({
  //   transport : Transport.TCP,
  //   port: 3333,
  //       });
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.use(cookieParser());
  app.use(json({ limit: '3mb' }));
  app.use(urlencoded({ extended: true, limit: '3mb' }));

  // await app.startAllMicroservices()
  await app.listen(3333);
}
bootstrap();
