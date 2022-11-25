import {Injectable, BadRequestException, HttpException, HttpStatus} from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service'
import { PrismaService } from 'src/prisma/prisma.service'


@Injectable()
export class FriendService{
    constructor(private prisma: PrismaService, private chatService: ChatService) {}

    async isFriend(userId: string, friendId: string) {
        try{
            const friendship = await this.prisma.friend.findMany({
                where: {
                    OR: [
                        {friendId: userId, friendById: friendId},
                        {friendId: friendId, friendById: userId}
                    ]
                }
            })
            if (friendship.length > 0)
                return true
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

    async getInvitedByMe(userId: number){
        try{
            const me = await this.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    invitedBy: 
                    {
                        include: {
                            invited: true
                        }
                    }
                }
            })
            const invitedByMe = me.invitedBy.map((user) => {
                return user.invited
            })
            
            return invitedByMe
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }


    async getInvited(userId: number){
        try{
            const me = await this.prisma.user.findUnique({
                where: { id: userId },})

            const invites = await this.prisma.invited.findMany({
                where: {
                    invitedId: me.idIntra
                },
                include: {
                    invitedBy: true
                }
            })

            const invitedByInfo = invites.map((user) => {
                return {
                    idIntra: user.invitedBy.idIntra,
                    img: user.invitedBy.img,
                    userName: user.invitedBy.userName,
                }
            })

            return invitedByInfo
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

            if (userToInvite.idIntra === userRequest.idIntra)
                throw new BadRequestException("You can't invite yourself");
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
            {
                throw new HttpException("Already friend", HttpStatus.BAD_REQUEST);
            }
            if (!await this.isInvited(invitedMe.idIntra, Me.idIntra))
            {
                throw new HttpException("Not invited", HttpStatus.BAD_REQUEST);
                return null
            }
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
            await this.chatService.newDm({idIntra: invitedMe.idIntra}, Me.idIntra)
            return friendshipCreation;
        }
        catch(e){
            console.log(e)
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
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

    async getFriends(body: any, idIntra: string){
        try{
            const user = await this.prisma.user.findUniqueOrThrow({
                where: {
                    idIntra: idIntra
                }
            })
            const friends = await this.prisma.friend.findMany({
                where: {
                    friendById: user.idIntra
                },
                select:
                {
                    friendId: true,
                    addedAt: true
                    
                }
            })
            const friends2 = await this.prisma.friend.findMany({
                where: {
                    friendId: user.idIntra
                },
                select:
                {
                    friendById: true,
                    addedAt: true
                }
            })

            const allFriends = friends.map((friend) => friend.friendId).concat(friends2.map((friend) => friend.friendById))
            const allFriendsInfo = allFriends.map(async (friend) => {
                const friendInfo = await this.prisma.user.findUnique({
                    where: {
                        idIntra: friend
                    },
                    select: {
                        idIntra: true,
                        userName: true,
                        img: true,
                        status: true,
                        rank : true,
                    }
                })
                return {
                    idIntra: friendInfo.idIntra,
                    userName: friendInfo.userName,
                    img: friendInfo.img,
                    status: friendInfo.status,
                    addedAt: friends2.find((friend2) => friend2.friendById === friendInfo.idIntra)?.addedAt || friends.find((friend) => friend.friendId === friendInfo.idIntra)?.addedAt,
                }
                return friendInfo
            })
            return Promise.all(allFriendsInfo)
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
            const remove = await this.prisma.friend.deleteMany({
                where: {
                    OR: [
                        {
                            friendById: user.idIntra,
                            friendId: friend.idIntra
                        },
                        {
                            friendById: friend.idIntra,
                            friendId: user.idIntra
                        }
                    ]
                }
            })
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async defaultFriends(){
        try{
            const me = ["ltorrean", "taureli", "mpaci", "mpatrini"]
            const friends = ["ltorrean", "mpaci", "vbeffa", "vubeffa", "taureli", "liafigli", "bvalaria", "mcrisari", "mpatrini"];
            for (let i = 0; i < me.length; i++){
                for (let j = 0; j < friends.length; j++){
                    if (me[i] != friends[j]){
                        if (!await this.isFriend(me[i], friends[j])){
                            const friendship = await this.prisma.friend.create({
                                data: {
                                    friendId: me[i],
                                    friendById: friends[j]
                                }
                            })
                            await this.chatService.newDm({idIntra: friends[j]}, me[i]);
                            console.log("friendship", friends[j] + " " + me[i])
                        }
                    }
                }
            }
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }
}
