import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'
import { AppGateway } from 'src/app.gateway'
import * as argon from 'argon2'

@Injectable()
export class ChatService {

    constructor(private prismaService: PrismaService, private userService: UserService) { }


    async getChatFromOtherProfile(body, idIntra: string)
    {
        try {
            console.log(JSON.stringify(body))
            const chats = await this.prismaService.chat.findMany({
                where:
                {
                    type: 'dm',
                    partecipant: {
                        some: {
                            idIntra: idIntra
                        }
                    }
                },
                include: {
                    partecipant: true,
                }
            })

            const user = await this.userService.getUserByIdIntra(body.idIntra)

            if (user.idIntra === idIntra) {
                throw new BadRequestException('You can\'t chat with yourself')
            }

            var chat = chats.find(chat => chat.partecipant.some(partecipant => partecipant.idIntra === body.idIntra))
            var chatId = chat?.id
            if (chatId === undefined) {
                throw new BadRequestException('Chat not found')
            }
            // if (chat === undefined)
            // {
            //     const newChat = await this.newDm({ idIntra: body.idIntra }, idIntra)
            //     chatId = newChat?.id
            //     if (newChat === undefined)
            //     {
            //         throw new BadRequestException("chat non trovata")
            //     }
            // }


            return {
                id : chatId,
                userName : user.userName,
                img : user.img,
                idIntra: user.idIntra
            }
        }
        catch (e) {
            throw new BadRequestException(e)
        }
    }

    async getChanInfo(body, userId: number) {
        try {
            console.log(JSON.stringify(body))
            const chan = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    id: body.id
                },
                select:
                {
                    name: true,
                    id: true,
                    type: true,
                }
            })
            return chan
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async getChannels(userId: number) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                },
            })
            const channels = await this.prismaService.chat.findMany({
                where: {
                    OR: [
                        {
                            type: 'public',
                        },
                        {
                            type: 'protected'
                        }
                    ]
                }
            })

            const chanInfo = await channels.map(async (channel: any) => {
                const partecipant = await this.prismaService.partecipant.findUnique({
                    where: {
                        idIntra_idChat: {
                            idIntra: user.idIntra,
                            idChat: channel.id
                        }
                    }
                })
                if (!partecipant)
                    return {

                        name: channel.name,
                        type: channel.type,
                        id: channel.id,

                    }
            })

            const ret = await (await Promise.all(chanInfo)).filter((el: any) => el !== undefined)
            return ret
        }
        catch (e) {
            throw new BadRequestException(e)
        }
    }

    async getBanned(body, userId: string) {
        try {
            const chan = await this.prismaService.chat.findUnique({
                where: {
                    id: body.id
                },
                include: {
                    partecipant: true
                }
            })

            const ret = await chan.partecipant.map(async (partecipant: any) => {
                if (partecipant.bannedUntil !== null && partecipant.bannedUntil > new Date()) {
                    const user = await this.prismaService.user.findUnique({
                        where: {
                            idIntra: partecipant.idIntra
                        }
                    })
                    return {
                        idIntra: partecipant.idIntra,
                        userName: user.userName,
                        img: user.img,
                    }
                }
            }
            )
            return (await Promise.all(ret)).filter((el: any) => el !== undefined)
        }
        catch (e) {
            throw new BadRequestException(e)
        }
    }

    async getMuted(body, userId: string) {
        try {
            const chan = await this.prismaService.chat.findUnique({
                where: {
                    id: body.id
                },
                include: {
                    partecipant: true
                }
            })

            const ret = await chan.partecipant.map(async (partecipant: any) => {
                if (partecipant.mutedUntil !== null && partecipant.mutedUntil > new Date()) {
                    const user = await this.prismaService.user.findUnique({
                        where: {
                            idIntra: partecipant.idIntra
                        }
                    })
                    return {
                        idIntra: partecipant.idIntra,
                        userName: user.userName,
                        img: user.img,
                        time: partecipant.mutedUntil,
                    }
                }
            }
            )
            return (await Promise.all(ret)).filter((el: any) => el !== undefined)
        }
        catch (e) {
            throw new BadRequestException(e)
        }
    }

    async getAdmin(body, userId: string) {
        try {
            const chan = await this.prismaService.chat.findUnique({
                where: {
                    id: body.id
                },
                include: {
                    partecipant: true,
                }
            })

            const ret = await chan.partecipant.map(async (partecipant: any) => {
                if (partecipant.admin !== null && partecipant.admin === true) {
                    const user = await this.prismaService.user.findUnique({
                        where: {
                            idIntra: partecipant.idIntra
                        }
                    })
                    return {
                        idIntra: partecipant.idIntra,
                        userName: user.userName,
                        img: user.img,
                    }
                }
            }
            )
            return (await Promise.all(ret)).filter((el: any) => el !== undefined)
        }
        catch (e) {
            throw new BadRequestException(e)
        }
    }

    async getChanUsers(body, userId: number) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where:
                {
                    id: body.id
                },
                include: {
                    partecipant: true
                }
            });

            const part = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: { idIntra: user.idIntra, idChat: channel.id }
                },
                select: {
                    owner: true,
                    admin: true
                }
            })

            const ret = await channel.partecipant.map(async (part: any) => {
                if (part.bannedUntil === null || part.bannedUntil < new Date()) {
                    const user = await this.prismaService.user.findUnique({
                        where:
                        {
                            idIntra: part.idIntra,
                        }
                    })
                    return {
                        idIntra: part.idIntra,
                        userName: user.userName,
                        img: user.img,
                        owner: part.owner,
                        admin: part.admin,
                        mutedUntil: part.mutedUntil,
                        muted: await this.isMuted(body.id, part.idIntra),
                        type: channel.type
                    }
                }
            });

            const ret2 = await (await Promise.all(ret)).filter((el: any) => el !== undefined)

            const ret3 = {
                me: {
                    owner: part.owner,
                    admin: part.admin
                },
                partecipants: ret2
            }

            return ret3;
        }
        catch (e: any) {
            throw new BadRequestException(e)
        }
    }

    async getChatUsers(body, userId: number) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                },
                include: {
                    partecipant: true
                }
            })

            const chats = await user.partecipant.map(async (partecipant: any) => {
                if (partecipant.bannedUntil === null || partecipant.bannedUntil < new Date()) {
                    const chat = await this.prismaService.chat.findUnique({
                        where: {
                            id: partecipant.idChat
                        }
                    })
                    if (chat.type !== 'dm')
                        return chat
                }
            })

            const ret = await (await Promise.all(chats)).filter((el: any) => el !== undefined)
            return ret
        }
        catch (e) {
            throw new BadRequestException(e)
        }
    }

    async getDms(body, idIntra: string) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: idIntra
                },
                include: {
                    partecipant: true
                }
            })

            const chats = await user.partecipant.map(async (partecipant: any) => {
                if (partecipant.bannedUntil === null || partecipant.bannedUntil < new Date()) {
                    console.log(partecipant.idIntra);
                    const chat = await this.prismaService.chat.findUnique({
                        where: {
                            id: partecipant.idChat,
                        },
                        select: {
                            id: true,
                            type: true,
                            name: true,
                            partecipant:
                            {
                                select: {
                                    user: {
                                        select: {
                                            idIntra: true,
                                            userName: true,
                                            img: true
                                        },
                                    }
                                }
                            }

                        }
                    })
                    // console.log(chat.partecipant);
                    if (chat.partecipant[0].user.idIntra === idIntra) {
                        delete chat.partecipant[0];
                    }
                    else {
                        delete chat.partecipant[1];
                    }
                    if (chat.type === 'dm') {
                        // remove null element
                        chat.partecipant = chat.partecipant.filter((el: any) => el !== undefined)
                        return chat
                    }
                }
            })

            const ret = await (await Promise.all(chats)).filter((el: any) => el !== undefined)
            return ret
        }
        catch (e) {
            throw new BadRequestException(e)
        }
    }

    async searchUser(body: any, userId: number) {
        try {
            if (body.initials === '')
                return []
            const me = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const users: { idIntra: String, img: String }[] = await this.prismaService.user.findMany({
                where: {
                    idIntra: {
                        not: me.idIntra,
                        startsWith: body.initials,
                    }
                },
                select: {
                    idIntra: true,
                    userName: true,
                    img: true
                }
            })

            // const addFriendRet = await users.map(async (user: any) => {
            //     const friend = await this.prismaService.friend.findUnique({
            //         where: {
            //             friendId_friendById: {

            //                 friendId: user.idIntra,
            //                 friendById: me.idIntra
            //             }
            //         }
            //     })
            //     return {
            //         friend: friend ? true : false,
            //     }
            // })

            const addInvetedRet = await users.map(async (user: any) => {
                const invited = await this.prismaService.invited.findUnique({
                    where: {
                        invitedId_invitedById: {

                            invitedId: user.idIntra,
                            invitedById: me.idIntra
                        },
                    }
                })

                //added friends logic
                const friend = await this.prismaService.friend.findUnique({
                    where: {
                        friendId_friendById: {

                            friendId: user.idIntra,
                            friendById: me.idIntra
                        }
                    }
                })
                // const addFriendRet = await users.map(async (user: any) => {
                //     const friend = await this.prismaService.friend.findUnique({
                //         where: {
                //             friendId_friendById: {

                //                 friendId: user.idIntra,
                //                 friendById: me.idIntra
                //             }
                //         }
                //     })

                // const addFriendRet = await users.map(async (user: any) => {
                //     const friend = await this.prismaService.friend.findUnique({
                //         where: {
                //             friendId_friendById: {

                //                 friendId: user.idIntra,
                //                 friendById: me.idIntra
                //             }
                //         }
                //     })

                // const addFriendRet = await users.map(async(user: any) => {
                //     const friend = await this.prismaService.friend.findUnique({
                //         where: {
                //             friendId_friendById: {
                //                 friendId: user.idIntra,
                //                 friendById: me.idIntra
                //             }
                //         }
                //     })



                const ret = {
                    idIntra: user.idIntra,
                    userName: user.userName,
                    img: user.img,
                    invited: invited ? true : false,
                    friend: friend ? true : false,
                }
                console.log(ret)
                return ret
            })

            const tmp = await Promise.all(addInvetedRet)




            const removeBlocked = await tmp.map(async (user: any) => {
                const blocked = await this.prismaService.blocklist.findMany({
                    where: {
                        OR: [
                            {
                                blockId: user.idIntra,
                                blockedId: me.idIntra
                            },
                            {
                                blockId: me.idIntra,
                                blockedId: user.idIntra
                            }
                        ]
                    }
                })
                if (blocked.length === 0)
                    return user
            })


            const ret = await Promise.all(removeBlocked);



            if (ret)
                return ret;
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    // async checkDmName(name: string){
    // 	const user = await this.prismaService.chat.findUnique({
    // 		where: {
    // 			name: name
    // 		}
    // 	})
    // 	if(user){
    // 		name = name + Math.floor(Math.random() * 10004)
    // 		return this.checkDmName(name)
    // 	}
    // 	return name
    // }



    async newDm(body: any, idIntra: string) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: idIntra
                }
            })

            if (user.idIntra !== body.idIntra) {

                // if not exist dm whit partecipant idIntra and user.idIntra and type dm
                const chatExist = await this.prismaService.chat.findFirst({
                    where: {
                        type: 'dm',
                        partecipant: {
                            every: {
                                idIntra: {
                                    in: [user.idIntra, body.idIntra]
                                }
                            }
                        }
                    },
                    select: {
                        id: true,
                        type: true,
                        name: true,
                        partecipant:
                        {
                            select: {
                                user: {
                                    select: {
                                        idIntra: true,
                                        userName: true,
                                        img: true
                                    },
                                }
                            }
                        }

                    }
                })
                if (chatExist) {
                    // this.appGateway.newDm(chatExist)
                    return chatExist
                }

                const chat = await this.prismaService.chat.create({
                    data: {
                        type: 'dm',
                        partecipant: {
                            create: [
                                {
                                    idIntra: user.idIntra,
                                },
                                {
                                    idIntra: body.idIntra,
                                }
                            ]
                        }
                    },
                    select: {
                        id: true,
                        type: true,
                        name: true,
                        partecipant:
                        {
                            select: {
                                user: {
                                    select: {
                                        idIntra: true,
                                        userName: true,
                                        img: true
                                    },
                                }
                            }
                        }

                    }
                })
                // this.appGateway.newDm(chat)
                return chat
            }
            return null

        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async isChanOwner(idChat: number, idIntra: string) {
        try {
            const partecipant = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: { idIntra: idIntra, idChat: idChat }
                }
            })
            if (partecipant.owner)
                return true
            return false
        }
        catch(err){
            console.log(err)
            throw new BadRequestException(err)
        }
    }

    async searchGeneral(body: any, userId: number) {
        try {
            if (body.initials === '')
                return []
            const users = await this.prismaService.user.findMany({
                where: {
                    idIntra: {
                        startsWith: body.initials,
                    }
                },
                select: {
                    idIntra: true,
                    img: true
                }
            })

            const channels = await this.prismaService.chat.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                startsWith: body.initials,
                            },
                            type: 'public'
                        },
                        {
                            name: {
                                startsWith: body.initials,
                            },
                            type: 'protected'
                        }
                    ]
                },
                select: {
                    name: true,
                    type: true,
                    id: true,
                }
            })

            const ret = {
                users: users,
                channels: channels
            }
            return ret
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }


    async newChannel(body: any, userId: number) {

        try {
            if (body.name === '')
                throw new BadRequestException('name is empty')
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            let channel;

            if (body.type === 'protected') {
                channel = await this.prismaService.chat.create({
                    data: {
                        name: body.name,
                        type: body.type,
                        password: await argon.hash(body.password)
                    }
                })
            }
            else if (body.type === 'public' || body.type === 'private') {
                channel = await this.prismaService.chat.create({
                    data: {
                        name: body.name,
                        type: body.type,
                    }
                })
            }

            await this.prismaService.partecipant.create({
                data: {
                    idChat: channel.id,
                    idIntra: user.idIntra,
                    owner: true,
                }
            })

            if (body.partecipants && body.partecipants.length > 0) {
                await Promise.all(body.partecipants.map(async (partecipant: any) => {
                    const part = await this.prismaService.partecipant.create({
                        data: {
                            idChat: channel.id,
                            idIntra: partecipant,
                        }
                    })
                    return part
                }))
            }

            return await this.prismaService.chat.findUnique({
                where: {
                    id: channel.id
                },
                include: {
                    partecipant: true,
                }

            })


        }
        catch (err) {

            throw new BadRequestException(err)
        }
    }

    async getUserPrivilegeInfo(body, userId: number) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    id: body.id
                },
            })

            const part = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: { idIntra: user.idIntra, idChat: channel.id }
                },
                select: {
                    owner: true,
                    admin: true
                }
            })
            return part
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }


    async destroyChannel(id: number) {
        try {
            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    id: id
                }
            })

            await this.prismaService.partecipant.deleteMany({
                where: {
                    idChat: channel.id
                }
            })

            await this.prismaService.chat.delete({
                where: {
                    id: channel.id
                }
            })
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async isBanned(id: number, idIntra: string) {

        try {

            const channel = await this.prismaService.chat.findUnique({
                where: {
                    id: id
                }
            })
            const idChat = channel.id
            const partecipant = await this.prismaService.partecipant.findUnique({
                where: {
                    idIntra_idChat: { idIntra, idChat }
                }
            })

            if (!partecipant)
                return false
            if (partecipant.bannedUntil) {
                if (partecipant.bannedUntil > new Date())
                    return true
            }
            return false

        }
        catch (err) {
            throw new BadRequestException(err)
        }

    }

    async isMuted(id: number, idIntra: string) {

        try {
            const channel = await this.prismaService.chat.findUnique({
                where: {
                    id: id
                }
            })
            const idChat = channel.id
            const partecipant = await this.prismaService.partecipant.findUnique({
                where: {
                    idIntra_idChat: { idIntra, idChat }
                }
            })

            if (partecipant.mutedUntil > new Date())
                return true
            return false
        }
        catch (err) {
            throw new BadRequestException(err)
        }

    }

    async muteUser(body: any, userId: number) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })

            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't mute yorself")
            if (await this.isMuted(body.id, user.idIntra))
                throw new BadRequestException('User already muted');
            if (!await this.isAlreadyIn(body.id, user.idIntra))
                throw new BadRequestException('User not in channel');
            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    id: body.id
                }
            })
            if ((await this.isAdmin(body.id, userId) || await this.isChanOwner(channel.id, reqUser.idIntra)) && !await this.isChanOwner(channel.id, user.idIntra)) {

                if (body.time) {
                    const partecipant = await this.prismaService.partecipant.update({
                        where: {
                            idIntra_idChat: { idIntra: body.idIntra, idChat: channel.id }
                        },
                        data: {
                            mutedAt: new Date(),
                            mutedUntil: new Date(new Date().getTime() + body.time * 60000)
                        }
                    })
                }
                else if (!body.time || body.time <= new Date()) {
                    const partecipant = await this.prismaService.partecipant.update({
                        where: {
                            idIntra_idChat: { idIntra: body.idIntra, idChat: channel.id }
                        },
                        data: {
                            mutedAt: new Date(),
                            mutedUntil: new Date(new Date().getTime() + 60 * 60000 * 24 * 365 * 100) // 100 years
                        }
                    })
                }
            }
            else {
                throw new BadRequestException('You are not an admin')
            }
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async getUserChatsMessages(idIntra: string, count: number) {
        try {
            const chats = await this.prismaService.partecipant.findMany({
                where: {
                    idIntra: idIntra
                },
                select: {
                    chat: {
                        select: {
                            id: true,
                            messages: {
                                select:{
                                    message: true,
                                    idIntra : true,
                                    sendedAt: true,
                                    idChat : true,
                                    users:{
                                        select:{
                                            userName: true,
                                            img : true,
                                            // blockedby:
                                            // {
                                            //     where:{
                                            //             NOT : {
                                            //                     blockId : idIntra
                                            //                 }
                                            //             }
                                            // },

                                        }
                                    },

                                },
                                orderBy: {
                                    sendedAt: 'asc'
                                },
                                take: -count,
                            },
                        }
                    }
                }
            })

            return chats
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }


    async getMessages(body, idIntra: string) {
        try {
            let messages = await this.getUserChatsMessages(idIntra, body.count)

            // pretty print JSON stignify
            // console.log(JSON.stringify(messages, null, 2))
            // console.log("DIVISORE")
            let blockedUsers = await this.userService.getAllBlockUsersFromIdIntra(idIntra)
            console.log(blockedUsers)
            messages.forEach(element => {
                for (let i = 0; i < element.chat.messages.length; i++) {
                    if (blockedUsers.includes(element.chat.messages[i].idIntra)) {
                        element.chat.messages.splice(i, 1)
                        i--
                    }
                }
            });
            // console.log(JSON.stringify(messages, null, 2))
            return messages

        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }



    async isAlreadyIn(chatid: number, idIntra: string) {
        try {
            const channel = await this.prismaService.chat.findUnique({
                where: {
                    id: chatid
                }
            })
            const idChat = channel.id
            const partecipant = await this.prismaService.partecipant.findUnique({
                where: {
                    idIntra_idChat: { idIntra, idChat }
                }
            })
            if (partecipant) {
                return true
            }
            return false
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async isAdmin(id: number, userId: number) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    id: id
                }
            })

            const partecipant = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: { idIntra: user.idIntra, idChat: channel.id }
                }
            })

            if (partecipant.admin) {
                return true
            }
            return false
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async changePassword(body: any, userId: number) {
        try {

            if (await this.isAdmin(body.id, userId)) {
                const chan = await this.prismaService.chat.update({
                    where: {
                        id: body.id
                    },
                    data: {
                        password: await argon.hash(body.password)
                    }
                })
            }
            else {
                throw new BadRequestException('You are not an admin')
            }
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async changeVisibility(body: any, userId: number) {
        try {
            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            if (!(body.type === 'public') && !(body.type === 'private') && !(body.type === 'protected'))
                throw new BadRequestException('Type must be public, private or protected')
            if (!await this.isChanOwner(body.id, reqUser.idIntra))
                throw new BadRequestException('You are not an owner')
            if ((body.type === 'public') || (body.type === 'private')) {
                const chan = await this.prismaService.chat.update({
                    where: {
                        id: body.id
                    },
                    data: {
                        type: body.type,
                        password: null
                    }
                })
            }
            else if (body.type === 'protected') {
                if (!body.password)
                    throw new BadRequestException('Password is required')
                const chan = await this.prismaService.chat.update({
                    where: {
                        id: body.id
                    },
                    data: {
                        type: body.type,
                        password: await argon.hash(body.password)
                    }
                })
            }
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async joinChannel(body: any, userId: number) {

        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            if (await this.isBanned(body.id, user.idIntra))
                throw new BadRequestException('User is Banned');
            if (await this.isAlreadyIn(body.id, user.idIntra))
                throw new BadRequestException('User is already in the channel');

            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    id: body.id
                }
            })

            if (channel.type === 'protected') {
                if (await argon.verify(channel.password, body.password)) {
                    const partecipant = await this.prismaService.partecipant.create({
                        data: {
                            idChat: channel.id,
                            idIntra: user.idIntra,
                        }
                    })
                }
                else {
                    throw new BadRequestException('Wrong password')
                }
            }
            if (channel.type === 'public') {
                const partecipant = await this.prismaService.partecipant.create({
                    data: {
                        idChat: channel.id,
                        idIntra: user.idIntra,
                    }
                })
            }
            else if (channel.type === 'private') {
                let invited = channel.invited;

                const found = invited.find(element => element === user.idIntra);

                if (!found)
                    throw new BadRequestException('Not invited');

                const partecipant = await this.prismaService.partecipant.create({
                    data: {
                        idChat: channel.id,
                        idIntra: user.idIntra,
                    }
                })

            }
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async unMuteUser(body: any, userId: number) {
        try {

            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    id: body.id
                }
            })
            if (!await this.isAdmin(body.id, userId) && !await this.isChanOwner(channel.id, reqUser.idIntra)) {
                throw new BadRequestException('You are not an admin or owner')
            }
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't unmute yorself")

            if (!await this.isMuted(body.id, user.idIntra))
                throw new BadRequestException('User is not muted');
            const partecipant = await this.prismaService.partecipant.update({
                where: {
                    idIntra_idChat: { idIntra: body.idIntra, idChat: channel.id }
                },
                data: {
                    mutedAt: null,
                    mutedUntil: null
                }
            })

        }
        catch (err) {
            console.log(err)
            throw new BadRequestException(err);
        }
    }

    async unBanUser(body: any, userId: number) {
        try {
            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    id: body.id
                }
            })
            if (!await this.isAdmin(body.id, userId) && !(await this.isChanOwner(channel.id, reqUser.idIntra))) {
                throw new BadRequestException('Not an admin or owner')
            }
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't unban yorself")

            if (!await this.isBanned(body.id, user.idIntra))
                throw new BadRequestException('User is not muted');
            const partecipant = await this.prismaService.partecipant.update({
                where: {
                    idIntra_idChat: { idIntra: body.idIntra, idChat: channel.id }
                },
                data: {
                    bannedAt: null,
                    bannedUntil: null,
                }
            })

        }
        catch (err) {
            console.log(err)
            throw new BadRequestException(err);
        }
    }

    async leaveChannel(body: any, userId: number) {

        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })


            if (!await this.isAlreadyIn(body.id, user.idIntra))
                throw new BadRequestException('User is not in the channel');
            else if (await this.isBanned(body.id, user.idIntra))
                throw new BadRequestException('User is Banned');

            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    id: body.id
                }
            })


            // if (await this.isChanOwner(channel.id, user.idIntra)) {
            //     await this.prismaService.partecipant.delete({
            //         where: {
            //             idIntra_idChat: { idIntra: user.idIntra, idChat: channel.id }
            //         }
            //     })
            //     await this.destroyChannel(body.id);
            // }
            // else {

            await this.prismaService.partecipant.delete({
                where: {
                    idIntra_idChat: { idIntra: user.idIntra, idChat: channel.id }
                }
            })
            // }
        }
        catch (err) {

            throw new BadRequestException(err)
        }
    }

    async banUser(body: any, userId: number) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't ban yorself")
            if (!await this.isAlreadyIn(body.id, user.idIntra))
                throw new BadRequestException('User is not in the channel');
            if (await this.isBanned(body.id, user.idIntra))
                throw new BadRequestException('User is already Banned');
            const channel = await this.prismaService.chat.findUnique({
                where: {
                    id: body.id
                }
            })
            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            if ((!await this.isAdmin(body.id, userId) && !await this.isChanOwner(channel.id, reqUser.idIntra)) || await this.isChanOwner(channel.id, user.idIntra))
                throw new BadRequestException('Not enough rights');
            if (body.time) {
                const partecipant = await this.prismaService.partecipant.update({
                    where: {
                        idIntra_idChat: { idIntra: body.idIntra, idChat: channel.id }
                    },
                    data: {
                        bannedAt: new Date(),
                        bannedUntil: new Date(new Date().getTime() + body.time * 60000),
                    }
                })
            }
            else if (!body.time || body.time === undefined || body.time <= new Date()) {

                const partecipant = await this.prismaService.partecipant.update({
                    where: {
                        idIntra_idChat: { idIntra: body.idIntra, idChat: channel.id }
                    },
                    data: {
                        bannedAt: new Date(),
                        bannedUntil: new Date(new Date().getTime() + 60 * 60000 * 24 * 365 * 100) // 100 years
                    }
                })
            }
        }
        catch (err) {
            console.log(err)
            throw new BadRequestException(err)
        }
    }

    async searchUserToAdd(body: any, userId: number) {
        try {
            const ret = await this.searchUser(body, userId)
            const realRet = ret.map(async (user) => {
                if ((await this.isAlreadyIn(body.id, user.idIntra)) === false)
                    return user
            })
            const real = (await Promise.all(realRet)).filter((user) => user !== undefined)
            return real
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async addUser(body: any, userId: number) {
        try {
            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            body.idIntra = [...new Set(body.idIntra)];
            body.idIntra.map(async (idIntra: string) => {

                const user = await this.prismaService.user.findUniqueOrThrow({
                    where: {
                        idIntra: idIntra
                    }
                })
                const channel = await this.prismaService.chat.findFirstOrThrow({
                    where: {
                        id: body.id
                    }
                })
                if (user.idIntra !== idIntra)
                    throw new BadRequestException("Can't add yorself")
                if (!await this.isAdmin(body.id, userId) && ! await this.isChanOwner(channel.id, reqUser.idIntra))
                    throw new BadRequestException('not enough rights');
                if (await this.isAlreadyIn(body.id, user.idIntra))
                    throw new BadRequestException('User is already in the channel');


                const partecipant = await this.prismaService.partecipant.create({
                    data: {
                        idChat: channel.id,
                        idIntra: user.idIntra,
                    }
                })
            })
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async removeUser(body: any, userId: number) {

        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })

            const channel = await this.prismaService.chat.findFirstOrThrow({
                where: {
                    id: body.id
                }
            })

            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't remove yorself")
            if ((!await this.isAdmin(body.id, userId) && !await this.isChanOwner(channel.id, reqUser.idIntra)))
                throw new BadRequestException('Not enough rights');
            if (await this.isChanOwner(channel.id, user.idIntra))
                throw new BadRequestException("Can't remove owner");
            if (await this.isBanned(body.id, user.idIntra))
                throw new BadRequestException('User is Banned');

            await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: { idIntra: user.idIntra, idChat: channel.id }
                }
            })

            await this.prismaService.partecipant.delete({
                where: {
                    idIntra_idChat: { idIntra: user.idIntra, idChat: channel.id }
                }
            })
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

    async addAdmin(body: any, userId: number) {
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })

            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const channel = await this.prismaService.chat.findFirstOrThrow({
                where: {
                    id: body.id
                }
            })
            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't add yorself")
            if (!await this.isAdmin(body.id, userId) && !await this.isChanOwner(channel.id, reqUser.idIntra))
                throw new BadRequestException('User is not an admin or owner');


            const partecipant = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: { idIntra: user.idIntra, idChat: channel.id }
                },
            })
            if (!partecipant.admin) {
                await this.prismaService.partecipant.update({
                    where: {
                        idIntra_idChat: { idIntra: user.idIntra, idChat: channel.id }
                    },
                    data: {
                        admin: true,
                    }
                })
            }

        }
        catch (err) {
            console.log(err)
            throw new BadRequestException(err);
        }
    }

    async removeAdmin(body: any, userId: number) {
        console.log(JSON.stringify(body))
        try {
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const channel = await this.prismaService.chat.findFirstOrThrow({
                where: {
                    id: body.id
                }
            })

            if (user.idIntra === body.idIntra)
                throw new BadRequestException("Can't remove yorself")
            if (!await this.isAdmin(body.id, userId) && !await this.isChanOwner(channel.id, user.idIntra))
                throw new BadRequestException('Not enough rights');


            const partecipant = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: { idIntra: body.idIntra, idChat: channel.id }
                },
            })
            console.log(partecipant)
            if (partecipant.admin) {
                await this.prismaService.partecipant.update({
                    where: {
                        idIntra_idChat: { idIntra: body.idIntra, idChat: channel.id }
                    },
                    data: {
                        admin: false,
                    }
                })
            }
        }
        catch (err) {
            console.log(err)
            throw new BadRequestException(err);
        }
    }

    async getArrayPartecipantsNotBanned(id: number) {
        try {
            // get from partecipant where idChat = id and (bannedUntil < now or bannedUntil = null)
            const partecipants = await this.prismaService.partecipant.findMany({
                where: {
                    idChat: id,
                    OR : [
                        {bannedUntil: {
                            lt: new Date()
                        }},
                        {bannedUntil: null}
                    ]


                }
            })
            const idIntra = []
            partecipants.forEach(partecipant => {
                idIntra.push(partecipant.idIntra)
            })
            return idIntra
        }
        catch (err) {
            throw new BadRequestException(err)
        }
    }

}
