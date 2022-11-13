import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { GamesService, user, gameState, maxScoreClassic, canvas, ball, com , net} from './games.service';

@WebSocketGateway(4244, { namespace: '/games', transports: ['websocket'] })
export class GamesGateway implements OnGatewayInit {
		constructor(
			private prisma: PrismaService,
			private gameService: GamesService,
		) { }
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
				user.score = 0;
				com.score = 0;
				// delete gameState.players[client.id]
		}

		@SubscribeMessage('newPlayer')
		async handleNewPlayer(client: Socket) {
				// console.log("gamestate", gameState)
				user.socketId = client.id;
				this.handleStart(client);
		}

		@SubscribeMessage('playerMovement')
		async handlePlayerMovement(client: Socket,playerMovement: any){

						//controllare se il client può muovere il paddle
						if (playerMovement.left && user.x > 0) {
							user.x -= 4
						}
						if (playerMovement.right && user.x < canvas.width - user.width) {
							user.x += 4
						}

						if (playerMovement.up && user.y > 0) {
							user.y -= 4
						}
						if (playerMovement.down && user.y < canvas.height - user.height) {
							user.y += 4
						}
						// console.log("user", user)

		}

		//stop chronjob when the value room is not null
		// @SubscribeMessage('room')
		// async handleRoom(client: Socket, room: any) {
		//     if (room) {
		//         this.logger.log(`Client room: ${room}`)
		//         client.join(room)
		//         this.server.to(room).emit('room', room)
		//     }
		// }

		// @SubscribeMessage('pong')
		handleStart(client: Socket) {
					const interval = setInterval(() => {
							this.gameService.update()
							gameState.user = user;
							gameState.com = com;
							gameState.ball = ball;
							gameState.net = net;
							if (user.score === maxScoreClassic || com.score === maxScoreClassic) {
									clearInterval(interval)
									// gameState.ball.x = canvas.width * 33333;
									// gameState.ball.y = canvas.height * 33333;
									if (com.score === maxScoreClassic) {
											this.server.emit('lose', gameState)
									}
									else
									{
											this.server.emit('win', gameState)
									}
									// remove user from room
									//emit win and lose
							}
							// console.log("gamestate", gameState)
							// console.log(ball.speed)
							this.server.emit('state', gameState);
					}, 1000 / 60)
					console.log("interval")
		}

		// @SubscribeMessage('pong')
		// @Interval(1000/60)
		// handleCron() {
		//     update();
		//     gameState.user = user;
		//     gameState.com = com;
		//     gameState.ball = ball;
		//     gameState.net = net;
		//     console.log("gamestate", gameState)
		//     this.server.emit('state', gameState);
		//     //stop chrone job after 10 seconds
		//     // if (new Date().getSeconds() === 10) {
		//     //     this.handleStop();
		//     // this.handleCron.stop();
		// }
}
