import { GamesService } from './games.service';
export declare class GamesController {
    private GamesService;
    constructor(GamesService: GamesService);
    createGame(body: any, req: any): Promise<void>;
    updateGame(body: any, req: any): Promise<void>;
    getLeaderboard(body: any, req: any): Promise<import(".prisma/client").User[]>;
    getPlayerProfile(body: any, req: any): Promise<number>;
    getGameHistory(body: any, req: any): Promise<{
        img1: string;
        img2: string;
        idGame: number;
        startedAt: Date;
        endedAt: Date;
        user1: string;
        user2: string;
        scoreP1: number;
        scoreP2: number;
        status: string;
        winner: string;
        loser: string;
    }[]>;
}
