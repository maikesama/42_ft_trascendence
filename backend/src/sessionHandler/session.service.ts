import { Injectable, CACHE_MANAGER, Inject, BadGatewayException} from '@nestjs/common';
import { Cache } from 'cache-manager';

interface ISession {
	status          : "in-game" | "online" | "offline",
	socketId        : string,
}

@Injectable()
export class SessionService {
	private readonly sessions: Map<string, ISession>;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.sessions = new Map<string, ISession>();
  }

  async saveSession(id : string, session : ISession) {
	try {
		await this.cacheManager.set(id, session, 0)
	} catch (e) {
		throw new BadGatewayException(e)
	}
}

async findSession(userId : string) : Promise<any> {
	try {
		let session: any = await this.cacheManager.get(userId)
		return session;
	} catch (e) {
		throw new BadGatewayException(e)
	}
}

async findAllSessions() : Promise< Map<string, ISession> > {
	try {
		return await this.sessions;
	} catch (e) {
		throw new BadGatewayException(e)
	}
}
}
