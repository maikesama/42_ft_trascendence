import { PrismaService } from 'src/prisma/prisma.service';
export declare class GamesService {
    private prisma;
    constructor(prisma: PrismaService);
    getWinner(body: any): Promise<{
        rank: number;
        win: number;
        winRow: number;
    }>;
    getLoser(body: any): Promise<{
        rank: number;
        winRow: number;
        loss: number;
    }>;
    getPlayerProfile(body: any): Promise<{
        rank: number;
        winRow: number;
        loss: number;
    }>;
    createGame(body: any): Promise<void>;
    updateGame(body: any): Promise<void>;
    sum(a: number, b: number): number;
    minus(a: number, b: number): number;
    getLeaderboard(body: any): Promise<import(".prisma/client").User[]>;
}
