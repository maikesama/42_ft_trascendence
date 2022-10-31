import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma/prisma.service';
import { ChatService } from './chat/chat.service';
import { Cache } from 'cache-manager';
import { SessionService } from './sessionHandler/session.service';
export declare class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    private chat;
    private cacheManager;
    private sessionService;
    constructor(prisma: PrismaService, chat: ChatService, cacheManager: Cache, sessionService: SessionService);
    server: Server;
    private logger;
    afterInit(server: any): void;
    OnGatewayConnection(client: Socket, ...args: any[]): void;
    OnGatewayDisconnect(client: Socket): void;
    OnGatewayInit(server: any): void;
    handleConnection(client: Socket, req: any, ...args: any[]): Promise<void>;
    handleDisconnect(client: Socket): void;
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
