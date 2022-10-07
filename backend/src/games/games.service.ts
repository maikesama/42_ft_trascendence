import {Injectable, BadRequestException} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'


@Injectable()
export class GamesService{
    constructor(private prisma: PrismaService) {}

    async isGames(userId: string, GamesId: string) {
        try{
            const Gamesship = await this.prisma.games.findUniqueOrThrow({
                where: {
                    invitedId_invitedById: { invitedId: GamesId, invitedById: userId }
                }
            })
            if (Gamesship){
                return true
            }
            return false
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async isInvited(reqIdIntra: string, toAddIdIntra: string){
        try{
            const inv = await this.prisma.invited.findUniqueOrThrow({
                where: {
                    invitedId_invitedById: { invitedId: toAddIdIntra, invitedById: reqIdIntra }
                }
            })
            if (inv){
                return true
            }
            return false
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async inviteGames(body: any, userId: number){
        try{
            const userToInvite = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })

            const userRequest = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            
            if (this.isInvited(userRequest.idIntra, userToInvite.idIntra))
                throw new BadRequestException("Already invited");
            if (this.isGames(userRequest.idIntra, userToInvite.idIntra))
                throw new BadRequestException("Already Games");
            const createInvitation = await this.prisma.invited.create({
                data: {
                    invitedId: userToInvite.idIntra,
                    invitedById: userRequest.idIntra,
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async removeInvite(body: any, userId: number){
        try{
            const userToInvite = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })

            const userRequest = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            
            if (!this.isInvited(userRequest.idIntra, userToInvite.idIntra))
                throw new BadRequestException("Not invited");
            if (this.isGames(userRequest.idIntra, userToInvite.idIntra))
                throw new BadRequestException("Already Games");
            const createInvitation = await this.prisma.invited.delete({
                where: {
                    invitedId: userToInvite.idIntra,
                    invitedById: userRequest.idIntra,
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async acceptInvite(body: any, userId: number){
        try{
            const invitedMe = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            const Me = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            if (this.isGames(Me.idIntra, invitedMe.idIntra))
                throw new BadRequestException("Already accepted");
            if (!this.isInvited(invitedMe.idIntra, Me.idIntra))
                throw new BadRequestException("Not invited");

            //controllo se vengono eseguite entrambre altrimenti reserver error
            const inviteAccept = await this.prisma.invited.delete({
                where:{
                    invitedId: Me.idIntra,
                    invitedById: invitedMe.idIntra,
                }
            })

            const GamesshipCreation = await this.prisma.games.create({
                data: {
                    GamesId: Me.idIntra,
                    GamesById: invitedMe.idIntra,
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async declineInvite(body: any, userId: number)
    {
        try{
            const invitedMe = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            const Me = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            if (this.isGames(Me.idIntra, invitedMe.idIntra))
                throw new BadRequestException("Already accepted");
            if (!this.isInvited(invitedMe.idIntra, Me.idIntra))
                throw new BadRequestException("Not invited");

            const inviteDecline = await this.prisma.invited.delete({
                where:{
                    invitedId: Me.idIntra,
                    invitedById: invitedMe.idIntra,
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async getGamess(body: any, userId: number){
        try{
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            const Gamess = await this.prisma.games.findMany({
                where: {
                    GamesById: user.idIntra
                }
            })
            return Gamess
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    //controllare la searchGames se funziona
    async searchGames(body: any, userId: number){
        try{
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            const Gamess = await this.prisma.games.findMany({
                where: {
                    GamesById: user.idIntra
                }
            })
            const Games = await this.prisma.games.findUniqueOrThrow({
                where: {
                    GamesId: body.idIntra
                }
            })
            return Games;
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async removeGames(body: any, userId: number){
        try{
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            const Games = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            if (!this.isGames(user.idIntra, Games.idIntra))
                throw new BadRequestException("Not Games");
            const remove = await this.prisma.games.delete({
                where: {
                    GamesId: user.idIntra,
                    GamesById: Games.idIntra,
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }
}