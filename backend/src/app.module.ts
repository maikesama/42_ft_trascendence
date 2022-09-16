import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from './prisma/prisma.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store'
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    // ConfigModule.forRoot({
    //   isGlobal: true
    // }),
    PassportModule.register({ session: true }),
    ClientsModule.register([
      {
        name:"NOTIFICATION_SERVICE",
        transport: Transport.TCP
      }
    ])
    // CacheModule.register({
    //   store: redisStore,
    //   url: 'redis://redis:6379'
    // })
    // SessionSerializer
  ],
  controllers: [],
  providers: [PrismaService, 
  //   {
  //   provide: APP_INTERCEPTOR,
  //   useClass: CacheInterceptor,
  // }
],
})
export class AppModule {}
