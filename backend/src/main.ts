import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {credentials: true, origin: [`http://${process.env.HOST}:3333`,
  `http://${process.env.HOST}:3000`,
  `http://${process.env.HOST}`]} });
  // app.enableCors({
  //   origin: [,
  //     `http://${process.env.HOST}:3333`,
  //     `http://${process.env.HOST}:3000`,
  //     `http://${process.env.HOST}`],
  //     credentials: true
  // })
  // const microservice = app.connectMicroservice({
  //   transport : Transport.TCP,
  //   port: 3333,
  //       });
  app.use(cookieParser());
  // await app.startAllMicroservices()
  await app.listen(3333);
}
bootstrap();
