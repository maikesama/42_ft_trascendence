import { Logger, BadRequestException, UseGuards, Req, Inject, CACHE_MANAGER, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

const gameState = {
		user: {},
		com: {},
		ball: {},
		net : {},
}

const canvas = {
		width: 1000,
		height: 600,
}

const maxScoreClassic = 5;
var start = 1;
// Ball object
const ball = {
	x : canvas.width/2,
	y : canvas.height/2,
	radius : 10,
	velocityX : 5,
	velocityY : 5,
	speed : 7,
	color : "WHITE"
}

// User Paddle
const user = {
	x : 0, // left side of canvas
	y : (canvas.height - 100)/2, // -100 the height of paddle
	width : 10,
	height : 100,
	score : 0,
	color : "WHITE",
	socketId : null,
}

// COM Paddle
const com = {
	x : canvas.width - 10, // - width of paddle
	y : (canvas.height - 100)/2, // -100 the height of paddle
	width : 10,
	height : 100,
	score : 0,
	color : "WHITE"
}

// NET
const net = {
	x : (canvas.width - 2)/2,
	y : 0,
	height : 10,
	width : 2,
	color : "WHITE"
}

function resetBall(){
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;
	ball.velocityX = -ball.velocityX;
	ball.speed = 7;
	ball.radius = 10;
}

function collision(b,p){
	p.top = p.y;
	p.bottom = p.y + p.height;
	p.left = p.x;
	p.right = p.x + p.width;

	b.top = b.y - b.radius;
	b.bottom = b.y + b.radius;
	b.left = b.x - b.radius;
	b.right = b.x + b.radius;

	return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function update(){

	// change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
	if( ball.x - ball.radius < 0 ){
			com.score++;
			// comScore.play();
			resetBall();
	}else if( ball.x + ball.radius > canvas.width){
			user.score++;
			// userScore.play();
			resetBall();
	}

	// the ball has a velocity
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;

	// computer plays for itself, and we must be able to beat it
	// simple AI
	com.y += ((ball.y - (com.y + com.height/2)))*0.1;

	// when the ball collides with bottom and top walls we inverse the y velocity.
	if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
			ball.velocityY = -ball.velocityY;
			// wall.play();
	}

	// we check if the paddle hit the user or the com paddle
	let player = (ball.x + ball.radius < canvas.width/2) ? user : com;

	// if the ball hits a paddle
	if(collision(ball,player)){
			// play sound
			// hit.play();
			// we check where the ball hits the paddle
			let collidePoint = (ball.y - (player.y + player.height/2));
			// normalize the value of collidePoint, we need to get numbers between -1 and 1.
			// -player.height/2 < collide Point < player.height/2
			collidePoint = collidePoint / (player.height/2);

			// when the ball hits the top of a paddle we want the ball, to take a -45degees angle
			// when the ball hits the center of the paddle we want the ball to take a 0degrees angle
			// when the ball hits the bottom of the paddle we want the ball to take a 45degrees
			// Math.PI/4 = 45degrees
			let angleRad = (Math.PI/4) * collidePoint;

			// change the X and Y velocity direction
			let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
			ball.velocityX = direction * ball.speed * Math.cos(angleRad);
			ball.velocityY = ball.speed * Math.sin(angleRad);

			// speed up the ball everytime a paddle hits it.
			ball.speed += 0.2;
			ball.radius -= 0.2;
	}
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
							update()
							gameState.user = user;
							gameState.com = com;
							gameState.ball = ball;
							gameState.net = net;
							if (user.score === maxScoreClassic || com.score === maxScoreClassic) {
									clearInterval(interval)
									gameState.ball = null;
									// remove user from room
									//emit win and lose
							}
							// console.log("gamestate", gameState)
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
