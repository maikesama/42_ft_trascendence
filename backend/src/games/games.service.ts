import {Injectable, BadRequestException} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'


@Injectable()
export class GamesService{
    constructor(private prisma: PrismaService) {}

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

    async getWinner(body: any){
        try{
            const infoWinner = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.winner
                },
                select: {
                    rank: true,
                    win: true,
                    winRow: true,
                }
            })
            return infoWinner;
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

    async getPlayerProfile(body: any){
        try{
            const player = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                },
                select: {
                    rank: true,
                    loss: true,
                    winRow: true,
                }
            })
            return player;
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
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async updateGame(body: any) {
        try{
            const game = await this.prisma.games.update({
                where: {
                    idGame: 14,
                },
                data: {
                    endedAt: new Date(),
                    winner: body.winner,
                    loser: body.loser,
                    scoreP1: body.scoreP1,
                    scoreP2: body.scoreP2,
                    status: "ended",
                }
            })

            const infoWinner = await this.getWinner(body.winner);

            const infoLoser = await this.getLoser(body.loser);

            const loser = await this.prisma.user.update({
                where: {
                    idIntra: body.loser
                },
                data: {
                    rank: this.minus(infoLoser.rank ,30),
                    loss: this.sum(infoLoser.loss , 1),
                    winRow: 0,
                }
            })
            const winner = await this.prisma.user.update({
                where: {
                    idIntra: body.winner
                },
                data: {
                    rank: this.sum(infoWinner.rank, 30),
                    loss: this.sum(infoWinner.win, 1),
                    winRow: this.sum(infoWinner.winRow, 1),
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
}