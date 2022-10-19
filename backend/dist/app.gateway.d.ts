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
    OnConnect(socket: Socket): void;
    afterInit(server: any): void;
    verifyPartecipant(idIntra: string, idChat: number): Promise<false | import(".prisma/client").Partecipant>;
    isChatAdmin(idIntra: string, idChat: number): Promise<boolean>;
    saveMessage(message: {
        sender: string;
        idChat: number;
        text: string;
    }): Promise<false | import(".prisma/client").Message>;
    clientToUser: {};
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
    handleMessage(client: Socket, message: {
        sender: string;
        idChat: number;
        text: string;
    }): Promise<void>;
    findAllMessages(client: Socket, idChat: number): Promise<import(".prisma/client").Message[]>;
    handleJoin(client: Socket, message: {
        sender: string;
        idChat: number;
        text: string;
    }): Promise<unknown[]>;
    handleTyping(isTyping: boolean, client: Socket, idChat: number): Promise<void>;
}
