import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { AtGuard } from './auth/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //let redisStore = require("connect-redis")(session)
  // const { createClient } = require("redis");
  // let redisClient = createClient({ url: process.env.REDIS_URI, legacyMode: true })
  // redisClient.connect().catch(console.error());
  
  //const redisStore = connectRedis(session);
  //app.setGlobalPrefix('api');
  //app.enableCors();
  // app.use(session({
  //   cookie:{
  //     maxAge: 3600000
  //   },
  //   secret: 'the 42 pong is fantastic',
  //   resave: false,
  //   saveUninitialized: false,
  //   //store: new redisStore({client: redisClient}),
  // }));
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.enableCors({
  //   origin: `http://${process.env.HOST}:3000`,
  //   credentials: true
  // });
  //app.enableCors()
  //const reflector = new Reflector();
  //app.useGlobalGuards(new AtGuard(reflector));
  app.use(cookieParser());
  await app.listen(3333);
}
bootstrap();
