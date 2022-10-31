import { CacheModule, Module, CACHE_MANAGER } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from './prisma/prisma.service';
import * as redisStore from 'cache-manager-redis-store'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';
import { FriendService } from './friend/friend.service';
import { FriendModule } from './friend/friend.module';
import { GamesModule } from './games/games.module';
import { GamesService } from './games/games.service';
import { SessionService } from './sessionHandler/session.service';
import { SessionModule } from './sessionHandler/session.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ChatModule,
    FriendModule,
    GamesModule,
    SessionModule,
    // ConfigModule.forRoot({
    //   isGlobal: true
    // }),
    //PassportModule.register({ session: true }),
    ClientsModule.register([
      {
        name:"NOTIFICATION_SERVICE",
        transport: Transport.TCP
      }
    ]),
    CacheModule.register({
      store: redisStore,
      host: 'rediStatus',
      port: 6379
  }),
    // SessionSerializer
  ],
  controllers: [],
  providers: [PrismaService, AppGateway, ChatService, FriendService, GamesService, SessionService],
  //   {
  //   provide: APP_INTERCEPTOR,
  //   useClass: CacheInterceptor,
  // }

})
export class AppModule {}
