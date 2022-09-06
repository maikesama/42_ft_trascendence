import { CacheInterceptor, CACHE_MANAGER, Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { Cache } from 'cache-manager';


@Injectable()
export class AppService {
	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
}
