import { Cache } from 'cache-manager';
interface ISession {
    status: "in-game" | "online" | "offline";
    socketId: string;
}
export declare class SessionService {
    private cacheManager;
    private readonly sessions;
    constructor(cacheManager: Cache);
    saveSession(id: string, session: ISession): Promise<void>;
    findSession(userId: string): Promise<any>;
    findAllSessions(): Promise<Map<string, ISession>>;
}
export {};
