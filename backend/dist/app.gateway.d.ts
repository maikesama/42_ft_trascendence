import { OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { ChatService } from './chat/chat.service';
export declare class AppGateway implements OnGatewayInit {
    private prisma;
    private chat;
    constructor(prisma: PrismaService, chat: ChatService);
    server: Server;
    private logger;
    afterInit(server: any): void;
    verifyPartecipant(idIntra: string, idChat: number): Promise<false | import(".prisma/client").Partecipant>;
    isChatAdmin(idIntra: string, idChat: number): Promise<boolean>;
    saveMessage(message: {
        sender: string;
        idChat: number;
        text: string;
    }): Promise<false | import(".prisma/client").Message>;
    handleMessage(client: Socket, message: {
        sender: string;
        idChat: number;
        text: string;
    }): Promise<void>;
}
