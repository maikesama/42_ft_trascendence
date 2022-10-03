import { OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
export declare class AppGateway implements OnGatewayInit {
    private prisma;
    constructor(prisma: PrismaService);
    server: Server;
    private logger;
    afterInit(server: any): void;
    verifyPartecipant(idIntra: string, idChat: number): Promise<boolean>;
    isChatAdmin(idIntra: string, idChat: number): Promise<boolean>;
    handleMessage(client: Socket, message: {
        room: string;
        text: string;
    }): Promise<void>;
}
