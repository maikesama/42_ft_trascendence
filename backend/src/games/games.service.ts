import {Injectable, BadRequestException} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'


@Injectable()
export class GamesService{
    constructor(private prisma: PrismaService) {}

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
                    idGame: body.idGame,
                    endedAt : null,
                    scoreP1 : 0,
                    scoreP2 : 0,
                    winner : null,
                    loser: null,
                    status: "waiting",
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

            const infoLooser = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.looser
                },
                select: {
                    rank: true,
                    loss: true,
                    winRow: true,
                }
            })

            const winner = await this.prisma.user.update({
                where: {
                    idIntra: body.winner
                },
                data: {
                    rank: infoWinner.rank + 10,
                    win: infoWinner.win + 1,
                    winRow: infoWinner.winRow + 1,
                }
            })

            const looser = await this.prisma.user.update({
                where: {
                    idIntra: body.winner
                },
                data: {
                    rank: infoLooser.rank - 10,
                    loss: infoLooser.loss + 1,
                    winRow: 0,
                }
            })
            return game;
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

}