import {Injectable, BadRequestException} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'


@Injectable()
export class FriendService{
    constructor(private prisma: PrismaService) {}

    async isFriend(userId: string, friendId: string) {
        try{
            const friendship1 = await this.prisma.friend.findUnique({
                where: {
                    friendId_friendById: { friendId: friendId, friendById: userId }
                }
            })
            const friendship2 = await this.prisma.friend.findUnique({
                where: {
                    friendId_friendById: { friendId: userId, friendById: friendId }
                }
            })
            if (friendship1 || friendship2){
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
            const inv = await this.prisma.invited.findUnique({
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

    async inviteFriend(body: any, userId: number){
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
            
            if (await this.isInvited(userRequest.idIntra, userToInvite.idIntra))
                throw new BadRequestException("Already invited");
            if (await this.isFriend(userRequest.idIntra, userToInvite.idIntra))
                throw new BadRequestException("Already friend");
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
            
            if (!await this.isInvited(userRequest.idIntra, userToInvite.idIntra))
                throw new BadRequestException("Not invited");
            if (await this.isFriend(userRequest.idIntra, userToInvite.idIntra))
                throw new BadRequestException("Already friend");
            const createInvitation = await this.prisma.invited.delete({
                where: {
                    invitedId_invitedById: {invitedId: userToInvite.idIntra, invitedById: userRequest.idIntra}
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
            if (await this.isFriend(Me.idIntra, invitedMe.idIntra))
                throw new BadRequestException("Already accepted");
            if (!await this.isInvited(invitedMe.idIntra, Me.idIntra))
                throw new BadRequestException("Not invited");

            //controllo se vengono eseguite entrambre altrimenti reserver error
            const inviteAccept = await this.prisma.invited.delete({
                where:{
                    invitedId_invitedById: {invitedId: Me.idIntra, invitedById: invitedMe.idIntra}
                }
            })

            const friendshipCreation = await this.prisma.friend.create({
                data: {
                    friendId: Me.idIntra,
                    friendById: invitedMe.idIntra,
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
            if (await this.isFriend(Me.idIntra, invitedMe.idIntra))
                throw new BadRequestException("Already accepted");
            if (!await this.isInvited(invitedMe.idIntra, Me.idIntra))
                throw new BadRequestException("Not invited");

            const inviteDecline = await this.prisma.invited.delete({
                where:{
                    invitedId_invitedById: {invitedId: Me.idIntra, invitedById: invitedMe.idIntra}
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async getFriends(body: any, userId: number){
        try{
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            const friends = await this.prisma.friend.findMany({
                where: {
                    friendById: user.idIntra
                }
            })
            return friends
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    // async searchFriend(body: any, userId: number){
    //     try{
    //         const user = await this.prisma.user.findUniqueOrThrow({
    //             where: {
    //                 id: userId
    //             }
    //         })
    //         const friends = await this.prisma.friend.findMany({
    //             where: {
    //                 friendById: user.idIntra
    //             }
    //         })
    //         const friend = await this.prisma.friend.findUniqueOrThrow({
    //             where: {
    //                 friendId: body.idIntra
    //             }
    //         })
    //         return friend;
    //     }
    //     catch(e){
    //         throw new BadRequestException(e)
    //     }
    // }

    async removeFriend(body: any, userId: number){
        try{
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            const friend = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            if (!await this.isFriend(user.idIntra, friend.idIntra))
                throw new BadRequestException("Not friend");
            const remove = await this.prisma.friend.delete({
                where: {
                    friendId_friendById: { friendId: user.idIntra, friendById: friend.idIntra }
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }
}