import { CacheModule, Module } from '@nestjs/common';
import { SessionService } from './session.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
    imports: [CacheModule.register({
		store: redisStore,
		host: 'rediStatus',
		port: 6379
	})],
    providers: [SessionService]
})
export class SessionModule {}