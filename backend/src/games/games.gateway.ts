import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { GamesService, userDefault, maxScoreClassic, canvas, ballDefault, comDefault , netDefault, players, rooms} from './games.service';

var playersNumber = 0;
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
				// user.score = 0;
				// com.score = 0;
				if (players[client.id] !== undefined) {
					if (players[client.id].status === 0) {
						playersNumber--;
						delete rooms[players[client.id].roomId];
						delete players[client.id];
					}
					else{
						if (rooms[players[client.id].roomId].status === 1) {
							delete players[client.id];
							// playersNumber--;
							// delete rooms[players[client.id].roomId];
						}
						else
						{
							console.log("4")
							let type = players[client.id].type;
							//capire decisione da prendere
							if (type === 0) {
								rooms[players[client.id].roomId].gameState.user.score = 0;
								rooms[players[client.id].roomId].gameState.com.score = maxScoreClassic;
							}
							else
							{
								rooms[players[client.id].roomId].gameState.com.score = 0;
								rooms[players[client.id].roomId].gameState.user.score = maxScoreClassic;
							}
						}
					}

				}
				// end match?
				console.log ("players", players)
				console.log ("rooms", rooms)

				// delete gameState.players[client.id]
		}

		isAlreadyInRoom(idIntra: string) {
				return false;
				for (let i = 0; i < players.size; i++) {
						if (players[i].idIntra === idIntra) {
								return true;
						}
				}
				return false;
		}
		@SubscribeMessage('newPlayer')
		async handleNewPlayer(client: Socket) {
				//not viewer but player and idIntra
				//check if already in players map
				let idIntra = "ltorrean";
				//mettere a posto
				console.log("handleNewPlayer")
				if (players[client.id] === undefined && !this.isAlreadyInRoom(idIntra)) {
						playersNumber++;
						let roomId = Math.round(playersNumber / 2).toString();
						let type = (playersNumber % 2 === 0) ? 1 : 0;
						// 0 left
						// 1 right
						players[client.id] = {idIntra: idIntra, roomId: roomId, type: type, status : 0};
						if (rooms[roomId] === undefined && type === 0) {
							rooms[roomId] = {id : roomId, status:-1, gameState: {user: this.gameService.defUser(), ball: this.gameService.defBall(), net: this.gameService.defNet()}};
							// rooms[roomId] = {id : roomId, status:-1, gameState: {user: userDefault, ball: ballDefault, net: netDefault, com: comDefault}};
							rooms[roomId].gameState.user.idIntra = "idIntra";
							rooms[roomId].gameState.user.img = "https://cdn.intra.42.fr/users/medium_ltorrean.jpg";
							rooms[roomId].gameState.user.username = "ltorreanUsername";
							rooms[roomId].gameState.user.socketId = client.id;
							client.join(Math.round(playersNumber / 2).toString())
							console.log("join ", roomId)
						}
						else {
							rooms[roomId].status = 0;
							rooms[roomId].gameState.com = this.gameService.defCom();
							rooms[roomId].gameState.com.idIntra = "ltorrean";
							rooms[roomId].gameState.com.img = "https://cdn.intra.42.fr/users/medium_ltorrean.jpg";
							rooms[roomId].gameState.com.username = "ltorreanUsername";
							rooms[roomId].gameState.com.socketId = client.id;
							players[client.id].status = 1;
							players[rooms[roomId].gameState.user.socketId].status = 1;
							// console.log("com", rooms[roomId].gameState.com)
							client.join(Math.round(playersNumber / 2).toString())
							console.log("join ", roomId)
							console.log("com", rooms[roomId].gameState.com)
							this.handleStart(roomId);
						}
						console.log("players", players)
						console.log("rooms", rooms)
						console.log("number", playersNumber)
						// console.log("update user", rooms[roomId].gameState.user)
						// console.log("update com", rooms[roomId].gameState.com)
						// console.log("update ball", rooms[roomId].gameState.ball)
						// console.log("update net", rooms[roomId].gameState.net)
					}
					// console.log("rooms", rooms[players[client.id].roomId].gameState.user)

				// user.socketId = client.id;
		}

		@SubscribeMessage('playerMovement')
		async handlePlayerMovement(client: Socket, playerMovement: any){

			// console.log("playerMovement", playerMovement)
			if (players[client.id] !== undefined) {
				let roomId = players[client.id].roomId;
				// console.log("roomId", roomId)
				let userToMove = (players[client.id].type === 0) ? rooms[roomId].gameState.user : rooms[roomId].gameState.com;
				// if (playerMovement.left && userToMove.x > 0) {
				// 	userToMove.x -= 4
				// }
				// if (playerMovement.right && userToMove.x < canvas.width - userToMove.width) {
				// 	userToMove.x += 4
				// }
				if (playerMovement.up && userToMove.y > 0) {
					userToMove.y -= 4
				}
				if (playerMovement.down && userToMove.y < canvas.height - userToMove.height) {
					userToMove.y += 4
				}
				// console.log ("userToMove", userToMove)
			}
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
		handleStart(room: string) {
			const interval = setInterval(() => {
							this.gameService.update( rooms[room].gameState.ball, rooms[room].gameState.user, rooms[room].gameState.com, rooms[room].gameState.net);
							// console.log("update user", rooms[room].gameState.user)
							// console.log("update com", rooms[room].gameState.com)
							// console.log("update ball", rooms[room].gameState.ball)
							// console.log("update net", rooms[room].gameState.net)
							// clearInterval(interval);
							// rooms[room].user = user;
							// rooms[room].com = com;
							// rooms[room].ball = ball;
							// rooms[room].net = net;
							if (rooms[room].gameState.user?.score === maxScoreClassic || rooms[room].gameState.com?.score === maxScoreClassic) {
									clearInterval(interval)
									rooms[room].status = 1;
									if (rooms[room].gameState.com.score === maxScoreClassic) {
										this.server.to(rooms[room].gameState.com.socketId).emit('win', rooms[room].gameState)
										this.server.to(rooms[room].gameState.user.socketId).emit('lose', rooms[room].gameState)
									}
									else
									{
										this.server.to(rooms[room].gameState.com.socketId).emit('lose', rooms[room].gameState)
										this.server.to(rooms[room].gameState.user.socketId).emit('win', rooms[room].gameState)
									}
									// update database
									// delete rooms[room];
									delete players[rooms[room].gameState.user.socketId];
									delete players[rooms[room].gameState.com.socketId];
									console.log("players", players)

							}
							this.server.to(room).emit('state', rooms[room].gameState)
							if (rooms[room].status === 1) {
								delete rooms[room];
							}
							console.log("rooms", rooms)
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
