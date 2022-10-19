import { PrismaService } from 'src/prisma/prisma.service';
export declare class GamesService {
    private prisma;
    constructor(prisma: PrismaService);
    getWinner(idUser: number): Promise<import(".prisma/client").User>;
    getLoser(body: any): Promise<{
        rank: number;
        loss: number;
        winRow: number;
    }>;
    getPlayerProfile(body: any, userId: number): Promise<number>;
    createGame(body: any): Promise<void>;
    updateGame(body: any): Promise<void>;
    sum(a: number, b: number): number;
    minus(a: number, b: number): number;
    getLeaderboard(body: any): Promise<import(".prisma/client").User[]>;
    getGameHistory(body: any, userId: number): Promise<{
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
