import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, );
  app.enableCors({
    origin: [,
      `http://${process.env.HOST}:3333`,
      `http://${process.env.HOST}:3000`,
      'http://10.11.9.3:3000',
      'http://10.11.9.3',
      `http://${process.env.HOST}`],
      credentials: true
  })
  // const microservice = app.connectMicroservice({
  //   transport : Transport.TCP,
  //   port: 3333,
  //       });
  app.use(cookieParser());
  // await app.startAllMicroservices()
  await app.listen(3333);
}
bootstrap();
