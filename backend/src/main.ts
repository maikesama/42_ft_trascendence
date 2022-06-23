import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      cookie: {
        maxAge: 60000 * 60,
      },
      secret: 'jajaajjaoijajsjsjsojisjai',
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3333);
}
bootstrap();
