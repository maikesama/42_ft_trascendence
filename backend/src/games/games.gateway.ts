import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

const gameState = {
    players: {}
  }



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
        delete gameState.players[client.id]
    }

    @SubscribeMessage('newPlayer')
    async handleNewPlayer(client: Socket) {
        gameState.players[client.id] = {
            x: 250,
            y: 250,
            width: 25,
            height: 25
        }
        console.log("gamestate", gameState)
    }

    @SubscribeMessage('playerMovement')
    async handlePlayerMovement(client: Socket,playerMovement: any){
            const player = gameState.players[client.id]
            const canvasWidth = 480
            const canvasHeight = 320
            
            if (playerMovement.left && player.x > 0) {
              player.x -= 4
            }
            if (playerMovement.right && player.x < canvasWidth - player.width) {
            player.x += 4
          }
            
            if (playerMovement.up && player.y > 0) {
              player.y -= 4
            }
            if (playerMovement.down && player.y < canvasHeight - player.height) {
              player.y += 4
            }
            console.log("player", player)
    }

    // setInterval(() => {
    //     Server.emit('state', gameState);
    //   }, 1000 / 60);
    // })



    @Interval(1000/60)
    handleCron() {
        // this.logger.log('Cron')
        this.server.emit('state', gameState);
    }
}