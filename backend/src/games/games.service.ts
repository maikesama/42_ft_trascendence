import {Injectable, BadRequestException} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export const maxScoreClassic: number = 5;
export const maxScoreCustom: number = 10;

export const canvas = {
        width: 1920,
        height: 1080,
}

export const rooms = new Map<string, any>();

export const players = new Map<string, any>();


// export const gameState = {
// 		user: {},
// 		com: {},
// 		ball: {},
// 		net : {},
//         status : 0,
// }

// Ball object
export const ballDefault = {
	x : canvas.width/2,
	y : canvas.height/2,
	radius : 10,
	velocityX : 5,
	velocityY : 5,
	speed : 13,
	color : "WHITE"
}

// User Paddle
export const userDefault = {
	x : 0, // left side of canvas
	y : (canvas.height - 100)/2, // -100 the height of paddle
	width : 30,
	height : 100,
	score : 0,
	color : "WHITE",
	socketId : null,
    idIntra : null,
    username : null,
    img : null,
}

// COM Paddle
export const comDefault = {
	x : canvas.width - 30, // - width of paddle
	y : (canvas.height - 100)/2, // -100 the height of paddle
	width : 30,
	height : 100,
	score : 0,
	color : "WHITE",
    socketId : null,
    idIntra : null,
    username : null,
    img : null,
}

// NET
export const netDefault = {
	x : (canvas.width - 2)/2,
	y : 0,
	height : 10,
	width : 2,
	color : "WHITE"
}

export const powerUpDefault = {
    x : 0,
    y : 0,
    with : 10,
    height : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "YELLOW",
    type : null,
    active : false,
    time : 0,
}




@Injectable()
export class GamesService{
    constructor(private prisma: PrismaService) {}


defBall(){
    return JSON.parse(JSON.stringify(ballDefault));
}

defBallCustom(){
    var data = this.defBall();
    // data.color = "YELLOW";
    data.radius = 20;
    return data;
}

defUser(){
    return JSON.parse(JSON.stringify(userDefault));
}

defUserCustom(){
    var data = this.defUser();
    data.color = "BLUE";
    data.height = 140;
    return data;
}

defCom(){
    return JSON.parse(JSON.stringify(comDefault));
}

defComCustom(){
    var data = this.defCom();
    data.color = "RED";
    data.height = 140;
    return data;
}

defNet(){
    return JSON.parse(JSON.stringify(netDefault));
}

defPowerUp(){
    return JSON.parse(JSON.stringify(powerUpDefault));
}

resetBall(ball:any , typeGame: number){
    // var velocityX = -ball.velocityX;
    // console.log(velocityX)
    var copyBall;
    if (typeGame === 1){
        copyBall = this.defBallCustom();
    }
    else{
        copyBall = this.defBall();
    }
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;
    // random velocytyX and velocityY
    var velocityX = Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    var velocityY = Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    ball.velocityX = copyBall.velocityX * velocityX;
    ball.velocityY = copyBall.velocityY * velocityY;
	ball.speed = copyBall.speed;
	ball.radius = copyBall.radius;

}

collision(b,p){
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

update(ball:any, user:any, com:any, net:any, powerUp:any, typeGame:any){

	// change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
	if( ball.x - ball.radius < 0 ){
			com.score++;
			// comScore.play();
			this.resetBall(ball, typeGame);
	}else if( ball.x + ball.radius > canvas.width){
			user.score++;
			// userScore.play();
			this.resetBall(ball, typeGame);
	}

	// the ball has a velocity
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;

	// computer plays for itself, and we must be able to beat it
	// simple AI
    // var iaArray = ["ltorrean", "gscala"]
    var iaArray = [ "gscala"]
    //set
    for (var i = 0; i < iaArray.length; i++){
        if (com.username === iaArray[i]){
            com.y += ((ball.y - (com.y + com.height/2))) * 0.3;
        }
        if (user.username === iaArray[i]){
            user.y += ((ball.y - (user.y + user.height/2)))*0.3;
        }
    }

	// com.y += ((ball.y - (com.y + com.height/2)))*0.1;

	// when the ball collides with bottom and top walls we inverse the y velocity.
	if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        ball.y = ball.y - ball.radius < 0 ? ball.radius : canvas.height - ball.radius;
        // wall.play();
	}
    //ball not over the screen


    if (typeGame === 1)
    {
        //random ball color

        // we check if the paddle hit the user or the com paddle
        const arrayColor = ["NONE",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Star_with_eyes.svg/1920px-Star_with_eyes.svg.png",
        "https://www.clipartmax.com/png/full/27-274934_new-super-mario-bros-mario-power-up-mushroom.png",
        "https://www.clipartmax.com/png/full/202-2029979_boomerang-mario-boomerang-mario.png",
        "https://www.clipartmax.com/png/full/373-3735636_blooper-weird-very-hard-to-destroy-creature-blooper-weird-very-hard-to.png"
    ]
        if (powerUp.active === false || powerUp.time <= 0)
        {
            // random from 5 to 10 seconds
            powerUp.time = Math.floor(Math.random() * 500) + 300;
            // random type speed / size / ball reverse
            //1 speed
            //2 size
            //3 ball reverse
            //4 ball black
            powerUp.type = Math.floor(Math.random() * 4) + 1;
            powerUp.color = arrayColor[powerUp.type];
            powerUp.height = 50;
            powerUp.width = 50;
            powerUp.x = Math.floor(Math.random() * (canvas.width - 10)) + 1;
            powerUp.y = Math.floor(Math.random() * (canvas.height - 10)) + 1;
            powerUp.active = true;
            // powerUp.ball = 0;
        }
        else if (powerUp.active === true && powerUp.time > 0)
        {
            powerUp.time--;
        }

        if (powerUp.ball > 0)
        {
            powerUp.ball--;
            ball.color = "BLACK";
        }
        else
        {
            // ball.color = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
            ball.color = "PINK";
        }


        if (powerUp.active)
        {
            if (this.collision(ball, powerUp))
            {
                //destroy powerUp
                powerUp.active = false;
                powerUp.x = 0;
                powerUp.y = 0;

                if (powerUp.type === 1)
                {
                    ball.speed += 5;
                }
                else if (powerUp.type === 2)
                {
                    ball.radius += 4;
                }
                else if (powerUp.type === 3)
                {
                    ball.velocityX = -ball.velocityX;
                }
                else if (powerUp.type === 4)
                {
                    powerUp.ball = Math.floor(Math.random() * 500) + 50;
                }
            }
        }
    }

	// we check if the paddle hit the user or the com paddle
	let player = (ball.x + ball.radius < canvas.width/2) ? user : com;

    let vel = 0;
	// if the ball hits a paddle
	if(this.collision(ball,player)){
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
            if (ball.speed < 19)
            {
                ball.speed += 0.2;
            }
            else
            {
                ball.speed = 19;
            }

            if (ball.radius > 8)
            {
                ball.radius -= 0.2;
            }

            // if (vel < ball.radius)
            // {
            //     vel = ball.radius;
            //     console.log(vel);
            // }
			// ball.radius -= 0.2;
	}
}

    /*async getWaitingGames(body: any, userId: number){
        try{
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const waitingGames = await this.prisma.games.findMany({
                where: {
                    user1: user.idIntra,
                    status: "waiting",
                },
                select: {
                    idGame: true,
                    user1: true,
                    user2: true,
                    status: true,
                },
                orderBy: {
                    idGame: 'asc'
                }
            })
            return waitingGames
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }*/

    // async getWinRate(body: any, userId: number){
    //     try{
    //         const user = await this.prisma.user.findUniqueOrThrow({
    //             where: {
    //                 id: userId
    //             }
    //         })

    //         const winRate = await this.prisma.user.findMany({
    //             where: {
    //                 idIntra: {
    //                     not: user.idIntra
    //                 }
    //             },
    //             select: {
    //                 idIntra: true,
    //                 username: true,
    //                 rank: true,
    //             },
    //             orderBy: {
    //                 rank: 'desc'
    //             }
    //         })
    //         return winRate
    //     }
    //     catch(e){
    //         throw new BadRequestException(e)
    //     }
    // }

    async getWinner(idUser: number){
        try{
            return await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: idUser
                },

            })

        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async getLoser(body: any){
        try{
            const infoLoser = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.loser
                },
                select: {
                    rank: true,
                    loss: true,
                    winRow: true,
                }
            })
            return infoLoser;
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async getPlayerProfile(body: any, idIntra: string){
        try{
            const player = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: idIntra
                },

            })
            const leaderboard = await this.prisma.user.findMany({
                orderBy: {
                    rank: 'desc'
                }
            })
            let position = leaderboard.findIndex((user) => user.id === player.id)
            position += 1

            return position
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async createGame(body: any) {
        try{
            const game = await this.prisma.games.create({
                data: {
                    user1: body.user1,
                    user2: body.user2,
                    type: body.type
                }
            })
            return game.idGame
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }


    async findGameById(gameId: any)
    {
        try {
            return await this.prisma.games.findUniqueOrThrow({
                where:
                {
                    idGame: gameId
                }
            })

        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async updateUserStats(winnerIdIntra: any, loserIdIntra: any, gameId: any)
    {
        try {
            var newAchievement = {winner:false , loser:false};
            const game = await this.findGameById(gameId);
            let winner = await this.prisma.user.findUniqueOrThrow({
                    where: {
                        idIntra: winnerIdIntra
                    },
                })

            let loser = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: loserIdIntra

                },
            })

            const toAddOnRank = game.type === 0 ? 10 : 30;
            loser = await this.prisma.user.update({
                where: {
                    idIntra: loserIdIntra
                },
                data: {
                    rank: this.minus(loser.rank, toAddOnRank) <= -2147483648 ? loser.rank : this.minus(loser.rank, toAddOnRank),
                    loss: this.sum(loser.loss , 1),
                    winRow: 0,
                }
            })
            winner = await this.prisma.user.update({
                where: {
                    idIntra: winnerIdIntra
                },
                data: {
                    rank: this.sum(winner.rank, toAddOnRank) >= 2147483647 ? winner.rank : this.sum(winner.rank, toAddOnRank),
                    win: this.sum(winner.win, 1),
                    winRow: this.sum(winner.winRow, 1),
                }
            })

            if (loser.rank < 0 && loser.achRealLoser === false)
            {
                newAchievement.loser = true;
                await this.prisma.user.update({
                    where: {
                        idIntra: loserIdIntra
                    },
                    data: {
                        achRealLoser: true,
                    }
                })
            }

            if (winner.win === 1 && winner.achFirstWin === false)
            {
                newAchievement.winner = true;
                await this.prisma.user.update({
                    where: {
                        idIntra: winnerIdIntra
                    },
                    data: {
                        achFirstWin: true,
                    }
                })

                //emit event to user
            }
            if (winner.winRow === 5 && winner.achFiveinRow === false)
            {
                newAchievement.winner  = true;
                await this.prisma.user.update({
                    where: {
                        idIntra: winnerIdIntra
                    },
                    data: {
                        achFiveinRow: true,
                    }
                })

                //emit event to user
            }
            if (winner.winRow === 10 && winner.achTeninRow === false)
            {
                newAchievement.winner  = true;
                await this.prisma.user.update({
                    where: {
                        idIntra: winnerIdIntra
                    },
                    data: {
                        achTeninRow: true,
                    }
                })

                //emit event to user
            }
            if (winner.winRow === 20 && winner.achTwentyinRow === false)
            {
                newAchievement.winner  = true;
                await this.prisma.user.update({
                    where: {
                        idIntra: winnerIdIntra
                    },
                    data: {
                        achTwentyinRow: true,
                    }
                })

                //emit event to user
            }
            if (((game.scoreP2 === 0) || (game.scoreP1 === 0)) && winner.achAce === false)
            {
                newAchievement.winner  = true;
                await this.prisma.user.update({
                    where: {
                        idIntra: winnerIdIntra
                    },
                    data: {
                        achAce: true,
                    }
                })
                //emit event to user
            }
            return newAchievement;
        }
        catch(e)
        {
            throw new BadRequestException(e)
        }
    }

    async updateGame(body: any) {
        try{
            const game = await this.prisma.games.update({
                where: {
                    idGame: Number(body.idGame),
                },
                data: {
                    endedAt: new Date(),
                    scoreP1: Number(body.scoreP1),
                    scoreP2: Number(body.scoreP2),
                    status: (body.scoreP1 > body.scoreP2 ? 1 : 2),
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }
    sum(a: number, b: number) {
        return a + b;
    }
    minus(a: number, b: number) {
        return a - b;
    }

    async getLeaderboard(body: any){
        try{
            //lista di tutti gli utenti
            //order by rank decrescente
            const leaderboard = await this.prisma.user.findMany({
                orderBy: {
                    rank: 'desc'
                }
            })

            leaderboard.forEach((user) => {
                delete user.otpSecret
                delete user.otpUrl
                delete user.twoFa
            })

            return leaderboard
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async getGameHistory(body: any, idIntra: string){

        try{
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: idIntra
                },
            })
            const gameHistory = await this.prisma.games.findMany({
                where: {
                    OR: [
                        {
                            user1: user.idIntra
                        },
                        {
                            user2: user.idIntra
                        }
                    ]
                },
                orderBy: {
                    startedAt: 'desc'
                }
            })

            const gameHistoryplusimg = await Promise.all(gameHistory.map(async (game) => {
                const userToGetImg1 = await this.prisma.user.findUniqueOrThrow({
                    where: {
                        idIntra: game.user1
                    },
                    select: {
                        img: true
                    }
                })

                const userToGetImg2 = await this.prisma.user.findUniqueOrThrow({
                    where: {
                        idIntra: game.user2
                    },
                    select: {
                        img: true
                    }
                })

                return {
                    ...game,
                    img1: userToGetImg1.img,
                    img2: userToGetImg2.img
                }
            }))

            return gameHistoryplusimg
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }
}
