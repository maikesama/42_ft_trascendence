import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';


@WebSocketGateway(4244, { namespace: '/games', transports: ['websocket'] })
export class GamesGateway implements OnGatewayInit {
    constructor(private prisma: PrismaService) { }
    @WebSocketServer() server: Server;

    private logger: Logger = new Logger('GamesGateway')

    afterInit(server: any) {
        this.logger.log('initialized')
    }

    OnGatewayInit(server: any) {
        this.logger.log('initialized')
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`)
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`)
    }

}