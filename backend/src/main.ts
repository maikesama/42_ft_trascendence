import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { AtGuard } from './auth/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [,
      `http://${process.env.HOST}:3333`,
      `http://${process.env.HOST}:3000`,
      `http://${process.env.HOST}`],
      credentials: true
  })
  app.use(cookieParser());
  await app.listen(3333);
}
bootstrap();
