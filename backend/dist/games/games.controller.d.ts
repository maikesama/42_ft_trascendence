import { GamesService } from './games.service';
export declare class GamesController {
    private GamesService;
    constructor(GamesService: GamesService);
    createGame(body: any, req: any): Promise<void>;
    updateGame(body: any, req: any): Promise<void>;
    getLeaderboard(body: any, req: any): Promise<import(".prisma/client").User[]>;
    getWinner(body: any, req: any): Promise<{
        rank: number;
        win: number;
        winRow: number;
    }>;
    getLoser(body: any, req: any): Promise<{
        rank: number;
        winRow: number;
        loss: number;
    }>;
}
