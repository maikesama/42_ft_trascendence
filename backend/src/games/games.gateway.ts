import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

const gameState = {
    players: {},
    ball : {}
}
var player = {
    id: 0,
    x: 0,
    y: 0,
    score: 0,
    speed: 0,
    direction: 0,
    color: 0,
    name: ""
}

var ball = {
    x: 0,
    y: 0,
    speed: 0,
    direction: 0
}

// var playerCount = 0;

const room = {
    id: 0,
    playerDx: {},
    playerSx: {},
    ball: {},
    playerCount: 0,
    gameStarted: false,
    gameEnded: false,
}

const width = 600;
const height = 400;
var x = width / 2;
var y = height - 30;
var ballRadius = 10;
var dx = 2;
var dy = -2;

var prova = null;

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
            // console.log("gameState", gameState.players)
            const player = gameState.players[client.id]
            prova = client.id;
            const canvasWidth = width
            const canvasHeight = height

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
            // console.log("player", player)
    }

    // setInterval(() => {
    //     Server.emit('state', gameState);
    //   }, 1000 / 60);
    // })



    @Interval(1000/60) // 1000ms = 1s
    handleCronBall() {
      // dx = 2;
      // dy = -2;
      x += dx;
      y += dy;
      // if (x + dx > width-ballRadius || x + dx < ballRadius) {
      //   console.log("goal")
      //   // dx = -dx;
      //   x = width/2;
      //   y = height /2;
      //   if (x + dx > width-ballRadius) {
      //     dx = -dx;
      //   }
      //   if (x + dx < ballRadius) {
      //     dx = -dx;
      //   }
      //   //random direction but not 0
      //   // dx = Math.floor(Math.random() * 4) - 2;
      //   // dy = Math.floor(Math.random() * 4) - 2;

      // }
      if (x + dx > width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy > height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
      }
      // if (y + dy > height-ballRadius) {
      //   if (x > 0 && x < width) {
      //     x = width/2;
      //     y = height-30;
      //     dx = 2;
      //     dy = -2;
      //     // paddleX = (width-paddleWidth)/2;
      //   }
      // }

      // if the ball hit the
    }
    @Interval(1000/60)
    handleCron() {
      // if(x + dx > width-ballRadius || x + dx < ballRadius) {
      //   dx = -dx;
      // }
      // if(y + dy < ballRadius) {
      //   dy = -dy;
      // }
      // else if(y + dy > height-ballRadius) {
      //       x = width/2;
      //       y = height-30;
      //       dx = 3;
      //       dy = -3;
      //       // paddleX = (width-paddleWidth)/2;
      //     // }
      //   }

        gameState.ball = {
          x: x,
          y: y,
          ballRadius: ballRadius,
        }
        // this.logger.log('Cron')
        this.server.emit('state', gameState);
    }
}
