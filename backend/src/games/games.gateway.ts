import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { AtGuard } from 'src/auth/guards';
import { UserService } from 'src/user/user.service';
import { GamesService, maxScoreClassic, maxScoreCustom, canvas, players, rooms} from './games.service';

// var playersNumberClassic = 0;
// var playersNumberCustom = 0;

var movSpeed = 8
var playerClassic = [];
var playerCustom = [];
var playerInvited = new Map<string, any>();
@WebSocketGateway(4244, { namespace: '/games', transports: ['websocket'] })
export class GamesGateway implements OnGatewayInit {
		constructor(
			private prisma: PrismaService,
			private gameService: GamesService,
			private userService: UserService,
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

		async leaveGame(client: Socket) {
			if (players[client.id] !== undefined) {
				const type = players[client.id].type;
				if (type === 0) {
					// rooms[players[client.id].roomId].gameState.user.score = 0;
					rooms[players[client.id].roomId].gameState.com.score = (rooms[players[client.id].roomId].type === 0) ? maxScoreClassic : maxScoreCustom;
				}
				else if (type === 1) {
					// rooms[players[client.id].roomId].gameState.com.score = 0;
					rooms[players[client.id].roomId].gameState.user.score = (rooms[players[client.id].roomId].type === 0) ? maxScoreClassic : maxScoreCustom;
				}
				// await this.userService.changeUserStatus(players[client.id].idIntra, 1);
				delete players[client.id];

			}
			else
			{
				console.log("player not found");
				for (let i = 0; i < playerClassic.length; i++) {
					// console.log(playerClassic[i]);
					if (playerClassic[i].client.id === client.id) {
						//delete playerClassic[i];
						playerClassic.splice(i, 1);
						console.log("leave room classic");
					}
				}
				for (let i = 0; i < playerCustom.length; i++) {
					if (playerCustom[i].client.id === client.id) {
						playerCustom.splice(i, 1);

						console.log("leave room custom");
					}
				}
			}
			for (let key in playerInvited) {
				if (playerInvited[key].client.id === client.id) {
					delete playerInvited[key];
					console.log("leave room invited");
					break;
				}
			}

			this.consoleLog()
		}

		async handleDisconnect(client: Socket) {
				this.logger.log(`Client disconnected: ${client.id}`)
				await this.leaveGame(client);
		}

		@SubscribeMessage('leaveGame')
		async leaveGameHandler(client: Socket) {
			console.log("leaveGameHandler");
			this.logger.log(`Client leave: ${client.id}`)
			await this.leaveGame(client);
		}

		isAlreadyInRoom(idIntra: string) {
			for (let key in players) {
				if (players[key].idIntra === idIntra) {
					return key;
				}
			}
			return null;
		}


		setUserInfo(user: any, client: any, userToSet:any)
		{
			userToSet.idIntra = user.idIntra;
			userToSet.img = user.img;
			userToSet.username = user.userName;
			userToSet.socketId = client.id;
			// userToSet.client = client;
		}

		isAlredyInQueue(idIntra: string, type: number) {
			for (let i = 0; i < playerClassic.length; i++) {
				if (playerClassic[i].idIntra === idIntra) {
					return true;
				}
			}
			for (let i = 0; i < playerCustom.length; i++) {
				if (playerCustom[i].idIntra === idIntra) {
					return true;
				}
			}
			return false;
		}

		setQueueInfo(data:any, type: number)
		{
			if(!this.isAlredyInQueue(data.idIntra, type))
			{
				if (type === 0) {
					playerClassic.push(data);
				}
				else
				{
					playerCustom.push(data);
				}
			}
		}

		newTwoUserQueue(type: number)
		{
			if (type === 0) {
				if (playerClassic.length >= 2) {
					let user1 = playerClassic.shift();
					let user2 = playerClassic.shift();
					return [user1, user2];
				}
			}
			else
			{
				if (playerCustom.length >= 2) {
					let user1 = playerCustom.shift();
					let user2 = playerCustom.shift();
					return [user1, user2];
				}
			}
			return [];

		}

		createRandomIdRoom()
		{
			//stringa random
			let idRoom = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
			while (rooms[idRoom] !== undefined) {
				idRoom = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
			}
			return idRoom;
		}

		async createRoom(type: number, newUsers: any)
		{
			const roomId = this.createRandomIdRoom();
			let room = {
				id: roomId,
				status: 0,
				type: type,
				gameState: {
					user: (type === 0) ? this.gameService.defUser(): this.gameService.defUserCustom(),
					com: (type === 0) ? this.gameService.defCom(): this.gameService.defComCustom(),
					ball: (type === 0) ? this.gameService.defBall(): this.gameService.defBallCustom(),
					net: this.gameService.defNet(),
					powerUp: this.gameService.defPowerUp()
				}
			}
			rooms[roomId] = room;
			for (let i = 0; i < 2; i++) {
				players[newUsers[i].client.id] = {idIntra: newUsers[i].idIntra, roomId: roomId, type: i, client: newUsers[i].client};
				await this.userService.changeUserStatus(newUsers[i].idIntra, 2)
				newUsers[i].client.join(roomId);
			}
			this.setUserInfo({idIntra: newUsers[0].idIntra, img : newUsers[0].img, userName: newUsers[0].userName}, newUsers[0].client, rooms[roomId].gameState.user);
			this.setUserInfo({idIntra: newUsers[1].idIntra, img : newUsers[1].img, userName: newUsers[1].userName}, newUsers[1].client, rooms[roomId].gameState.com);
			const games = await this.gameService.createGame({user1: rooms[roomId].gameState.user.idIntra, user2: rooms[roomId].gameState.com.idIntra, type: type});
			rooms[roomId].realId = games;
			rooms[roomId].invited = (newUsers[0]?.invited?.invited !== undefined) ? newUsers[0]?.invited?.invited : undefined;
			this.server.emit("trigger");
			this.consoleLog()
			return roomId;
		}

		async matchUsers(typeGame: number, newUsers: any)
		{
			if (newUsers.length === 2)
			{
				const roomId = await this.createRoom(typeGame, newUsers);
				if (roomId)
				{
					await this.handleStart(roomId);
					// console.log("user", rooms[roomId].gameState.user)
					// console.log("com", rooms[roomId].gameState.com)
					return ;
				}
				else
				{
					for (let i = 0; i < 100; i++) {
						console.log("error create room");
					}
				}
			}
			return false;
		}

		@UseGuards(AtGuard)
		@SubscribeMessage('newPlayer')
		async handleNewPlayer(client: Socket, idIntraSpect : any) {
				//not viewer but player and idIntra
				//check if already in players map
				const user = await this.userService.getUserByIdIntra(client["user"]["idIntra"]);
				// user["idIntra"] = client["user"]["idIntra"];

				let typeGame = (idIntraSpect === "1") ? 1 : (idIntraSpect === "0") ? 0 : 2;

				if (typeGame === 2) {
					if ((idIntraSpect[0] === "1" || idIntraSpect[0] === "0" || idIntraSpect[0] === "2" ) && !this.isAlredyInQueue(user.idIntra, typeGame) && playerInvited[user.idIntra] === undefined) {
						let typeGame2 = parseInt(idIntraSpect[0]);
						idIntraSpect = idIntraSpect.slice(1);
						const userInvited = await this.userService.isUserExist(idIntraSpect);
						console.log("userInvited", userInvited)
						if (userInvited) {
							if (typeGame2 === 2)
							{
								if (playerInvited[idIntraSpect] !== undefined && playerInvited[idIntraSpect].invited.idIntra === user.idIntra && playerInvited[idIntraSpect].invited.status === 0) {
									var user2 = {idIntra: user.idIntra, roomId: null, type: 0, status : 0, img: user.img, userName: user.userName, client: client, idIntraSpect: idIntraSpect};
									playerInvited[idIntraSpect].invited.status = 1;
									await this.matchUsers(playerInvited[idIntraSpect].typeGame, [playerInvited[idIntraSpect], user2]);
									// delete playerInvited[idIntraSpect];
								}
							}
							else
							{
								if (playerInvited[user.idIntra] === undefined) {
									playerInvited[user.idIntra] = {idIntra: user.idIntra, roomId: null, type: 0, status : 0, img: user.img, userName: user.userName, client: client, typeGame: typeGame2, invited:{idIntra: idIntraSpect, status: 0, invited: user.idIntra}};
									console.log("player invited", playerInvited[user.idIntra].idIntra, " -> ", idIntraSpect);
									client.emit("invited");
								}
							}
						}
						else
						{
							client.emit("GameNotFound");
							this.consoleLog()
							return;
						}
						// this.server.to(userInvited.socketId).emit("invite", {idIntra: user.idIntra, userName: user.userName, img: user.img, type: typeGame});
					}
					else
					{
						const idIntraSpectator = this.isAlreadyInRoom(idIntraSpect);
						if (idIntraSpectator && idIntraSpect !== user.idIntra)
						{
							client.join(players[idIntraSpectator].roomId);
						}
						else
						{
							client.emit("GameNotFound");
						}
						// return;
						this.consoleLog()
						return;
					}

				}

				if (players[client.id] === undefined && user && !this.isAlreadyInRoom(user.idIntra) && !this.isAlredyInQueue(user.idIntra, typeGame) && typeGame !== 2) {
				{
					this.setQueueInfo({idIntra: user.idIntra, roomId: null, type: 0, status : 0, img: user.img, userName: user.userName, client: client}, typeGame);
					console.log("PlaerClassic: " + playerClassic);
					console.log("PlaerCustom: " + playerCustom);
					const newUsers = this.newTwoUserQueue(typeGame)
					await this.matchUsers(typeGame, newUsers);

				}
				// emit matthmaking


				// if (players[client.id] === undefined && !this.isAlreadyInRoom(idIntra)) {
				// 		playersNumberClassic++;
				// 		let roomId = Math.round(playersNumberClassic / 2).toString();
				// 		let type = (playersNumberClassic % 2 === 0) ? 1 : 0;
				// 		// 0 left
				// 		// 1 right
				// 		players[client.id] = {idIntra: idIntra, roomId: roomId, type: type, status : 0};
				// 		if (rooms[roomId] === undefined && type === 0) {
				// 			rooms[roomId] = {id : roomId, status:-1, type : typeGame, gameState: {user: this.gameService.defUser(), ball: this.gameService.defBall(), net: this.gameService.defNet()}};
				// 			this.setUserInfo(user, client.id, rooms[roomId].gameState.user);
				// 			client.join(roomId)
				// 			console.log("join ", roomId)
				// 		}
				// 		else {
				// 			rooms[roomId].status = 0;
				// 			rooms[roomId].gameState.com = this.gameService.defCom();
				// 			this.setUserInfo(user, client.id, rooms[roomId].gameState.com);
				// 			players[client.id].status = 1;
				// 			players[rooms[roomId].gameState.user.socketId].status = 1;
				// 			client.join(roomId)
				// 			console.log("join ", roomId)
				// 			const games = await this.gameService.createGame({user1: rooms[roomId].gameState.user.idIntra, user2: rooms[roomId].gameState.com.idIntra, type: typeGame});
				// 			rooms[roomId].realId = games;
				// 			await this.handleStart(roomId);
				// 		}
				// 		console.log("number", playersNumberClassic)
				// 	}

				this.consoleLog()
		}
	}


	consoleLog()
	{
		console.log("players", players)
		console.log("rooms", rooms)
		console.log("PlaerClassic: ");
		console.log(playerClassic);
		console.log("PlaerCustom: ");
		console.log(playerCustom);
		console.log("playerInvited", playerInvited)
	}

	@SubscribeMessage('declineGame')
	declineGame(client: Socket, data: any){
		for (let key in playerInvited) {
			if (playerInvited[key].client.id === client.id) {
				if (playerInvited[key].invited.idIntra === data.idIntra) {
					delete playerInvited[key];
				}
			}
		}
	}


		@SubscribeMessage('playerMovement')
		async handlePlayerMovement(client: Socket, playerMovement: any){

			// console.log("playerMovement", playerMovement)
			if (players[client.id] !== undefined) {
				let roomId = players[client.id].roomId;
				// console.log("roomId", roomId)
				let userToMove = (players[client.id].type === 0) ? rooms[roomId].gameState.user : rooms[roomId].gameState.com;


				if(rooms[roomId].type === 1)
				{
					let type = players[client.id].type;
					if (playerMovement.left && userToMove.x > 0) {
						if ((type === 1 && (userToMove.x - movSpeed) >= canvas.width / 2)|| type === 0 ) {
							userToMove.x -= movSpeed
						}
					}
					if (playerMovement.right && userToMove.x < canvas.width - userToMove.width) {
						if ((type === 0 && (userToMove.x + movSpeed) <= canvas.width / 2 - 10) || type === 1 ) {
							userToMove.x += movSpeed
						}
					}
				}


				if (playerMovement.up && userToMove.y > 0) {
					userToMove.y -= movSpeed
				}
				if (playerMovement.down && userToMove.y < canvas.height - userToMove.height) {
					userToMove.y += movSpeed
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
		async handleStart(room: string) {
			console.log("fine")
			if (rooms[room] !== undefined && rooms[room].status === 0) {
				const interval = setInterval(async () => {
							this.gameService.update( rooms[room].gameState.ball, rooms[room].gameState.user, rooms[room].gameState.com, rooms[room].gameState.net, rooms[room].gameState.powerUp, rooms[room].type);
							if ((rooms[room].gameState.user?.score === ((rooms[room].type === 0) ? maxScoreClassic : maxScoreCustom)) || (rooms[room].gameState.com?.score === ((rooms[room].type === 0) ? maxScoreClassic : maxScoreCustom)))  {
									clearInterval(interval)
									rooms[room].status = 1;
									var winner;
									var loser;
									if (rooms[room].gameState.com.score === ((rooms[room].type === 0) ? maxScoreClassic : maxScoreCustom)) {
										winner = rooms[room].gameState.com;
										loser = rooms[room].gameState.user;
										this.server.to(rooms[room].gameState.com.socketId).emit('win', rooms[room].gameState)
										this.server.to(rooms[room].gameState.user.socketId).emit('lose', rooms[room].gameState)
									}
									else
									{
										winner = rooms[room].gameState.user;
										loser = rooms[room].gameState.com;
										this.server.to(rooms[room].gameState.com.socketId).emit('lose', rooms[room].gameState)
										this.server.to(rooms[room].gameState.user.socketId).emit('win', rooms[room].gameState)
									}
									const update = await this.gameService.updateGame({idGame: rooms[room].realId, scoreP1: rooms[room].gameState.user.score, scoreP2: rooms[room].gameState.com.score});
									const updateUserStats = await this.gameService.updateUserStats(winner.idIntra, loser.idIntra, rooms[room].realId);


								}
							this.server.to(room).emit('state', rooms[room].gameState)
							if (rooms[room].status === 1) {
								if (players[rooms[room].gameState.user.socketId] !== undefined) {
									players[rooms[room].gameState.user.socketId].client.leave(room);
									await this.userService.changeUserStatus(rooms[room].gameState.user.idIntra, 1);
								}
								if (players[rooms[room].gameState.com.socketId] !== undefined) {
									players[rooms[room].gameState.com.socketId].client.leave(room);
									await this.userService.changeUserStatus(rooms[room].gameState.com.idIntra, 1);
								}
								this.server.to(room).emit('gameOver');
								this.server.emit('trigger');
								delete players[rooms[room].gameState.user.socketId];
								delete players[rooms[room].gameState.com.socketId];
								if (rooms[room]?.invited !== undefined) {
									delete playerInvited[rooms[room].invited];
								}
								delete rooms[room];
								this.consoleLog()
								// console.log("playerInvited", playerInvited)
							}
					}, 1000 / 60)
					console.log("interval")


				}
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
