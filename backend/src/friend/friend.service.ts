import {Injectable, BadRequestException} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'


@Injectable()
export class FriendService{
    constructor(private prisma: PrismaService) {}

    async isFriend(userId: string, friendId: string) {
        try{
            const frienship = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: userId
                },
                select:{
                    friends: {
                        where: {
                            friendId: friendId
                        }
                    }
                }

            })

            if (!frienship)
                return false
            return true
        }
        catch(err){
            throw new BadRequestException(err)
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
            
            if (this.isInvited(userRequest.idIntra, userToInvite.idIntra))
                throw new BadRequestException("Already invited");
            if (this.isFriend(userRequest.idIntra, userToInvite.idIntra))
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
            if (this.isFriend(Me.idIntra, invitedMe.idIntra))
                throw new BadRequestException("Already friend");
            const createFriendship = await this.prisma.friends.create({
                data: {
                    friendId: invitedMe.idIntra,
                }
            })
            const createFriendship2 = await this.prisma.friends.create({
                data: {
                    userId: Me.idIntra,
                    friendId: invitedMe.idIntra,
                }
            }) //change friend model to have double id
            const deleteInvitation = await this.prisma.invited.delete({
                where: {
                    invitedId_invitedById: { invitedId: invitedMe.idIntra, invitedById: Me.idIntra }
                }
            })
        }

        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async declineInvite(body: any, userId: number){
    }
}