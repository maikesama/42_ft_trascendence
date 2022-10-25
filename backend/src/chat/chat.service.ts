import {Injectable, BadRequestException} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import * as argon from 'argon2'


@Injectable()
export class ChatService{

    constructor(private prismaService: PrismaService){}

    async getChannels(userId: number){
        try{
            const channels = await this.prismaService.chat.findMany({
                where: {
                    OR: [
                        {
                            type: 'public'
                        },
                        {
                            type: 'protected'
                        }
                    ]
                }
            })
            const chanInfo = await channels.map(async(channel: any) => {
                return {

                    name: channel.name,
                    type: channel.type,
                    id: channel.id,

                }})

            return chanInfo
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }

    async getChatUsers(body, userId: number){
        try{
            const chat = await this.prismaService.chat.findUnique({
                where: {
                    id: body.chatId
                },
                include: {
                        partecipant : true
                }
            })

            const users = await chat.partecipant.map(async(user: any) => {
                const userInfo = await this.prismaService.user.findUnique({
                    where: {
                        idIntra: user.idIntra
                    },
                    select: {
                        idIntra: true,
                        img: true,
                    }
                })
                return {   
                    idIntra: userInfo.idIntra,
                    img: userInfo.img,
                }
            })
            
            

            return users
        }
        catch(e){
            throw new BadRequestException(e)
        }
    }
                    


    async searchUser(body: any, userId: number){
        try{
            if (body.initials === '')
                return []
            const me = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const users: {idIntra: String, img: String}[] = await this.prismaService.user.findMany({
                where: {
                    idIntra: {
                        not: me.idIntra,
                        startsWith: body.initials,
                    }},
                select: {
                        idIntra: true,
                        img: true
                    }
            })


            
            const addInvetedRet = await users.map(async(user: any) => {
                const invited = await this.prismaService.invited.findUnique({
                    where: {
                        invitedId_invitedById: {
                            
                            invitedId: user.idIntra,
                            invitedById: me.idIntra
                        }
                    }
                })
                
                const ret = {
                    idIntra: user.idIntra,
                    img: user.img,
                    invited: invited ? true : false
                }
                return ret
            })
            
            const tmp = await Promise.all(addInvetedRet)

            

            const removeBlocked = await tmp.map(async(user: any) => {
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
        catch(err){
            throw new BadRequestException(err)
        }   
    }

    async newDm(body: any, userId: number){
        try{
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            if (user.idIntra !== body.idIntra){

            const chat = await this.prismaService.chat.create({
                data: {
                    type: 'dm',
                    name: "DM",
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
                }
            })
        }
        }
        catch(err){
            throw new BadRequestException(err)
        }
    }

    async isChanOwner(idChat: number, idIntra: string){
        try{
            const partecipant = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                        idIntra_idChat: {idIntra: idIntra, idChat: idChat}
                }
            })
            if (partecipant.owner)
                return true
            return false
        }
        catch(err){
            throw new BadRequestException(err)
        }
    }

    async searchGeneral(body: any, userId: number){
        try{
            if (body.initials === '')
                return []
            const users = await this.prismaService.user.findMany({
                where: {
                    idIntra: {
                        startsWith: body.initials,
                    }},
                select: {
                        idIntra: true,
                        img: true
                    }
            })

            const channels = await this.prismaService.chat.findMany({
                where: {
                    OR : [
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
                select : {
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
        catch(err){
            throw new BadRequestException(err)
        }
    }


    async newChannel(body: any, userId: number){
        
        try{
            const chan = await this.prismaService.chat.findUnique({
                where: {
                    name: body.name
                }
            })
            if (!chan){
                const user = await this.prismaService.user.findUniqueOrThrow({
                    where: {
                        id: userId
                    }
                })

                let channel;

                if ( body.type === 'protected' ){
                    channel = await this.prismaService.chat.create({
                        data: {
                            name: body.name,
                            type: body.type,
                            password: await argon.hash(body.password)
                        }
                    })}
                else if (body.type === 'public' || body.type === 'private'){
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

                if (body.partecipants   && body.partecipants.length > 0){
                await Promise.all(body.partecipants.map(async(partecipant: any) => {
                    const part = await this.prismaService.partecipant.create({
                        data: {
                            idChat: channel.id,
                            idIntra: partecipant.idIntra,
                        }
                    })
                    return part
                }))
                }
            }
            else
            {
                throw new BadRequestException('Channel already exists')
            }    
        }
        catch(err){
            console.log(err)
            throw new BadRequestException(err)
        }
    }

    async destroyChannel(body: any, userId: number){
        try{
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    name: body.name
                }
            })

            if (channel){
                const partecipant = await this.prismaService.partecipant.findUniqueOrThrow({
                    where: {
                            idIntra_idChat: {idIntra: user.idIntra, idChat: channel.id}
                    }
                })

                if (partecipant.admin){
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
                else{
                    throw new BadRequestException('You are not admin')
                }
            }
            else{
                throw new BadRequestException('Channel does not exist')
            }
        }
        catch(err){
            throw new BadRequestException(err)
        }
    }

    async isBanned(name: string, idIntra: string){

        try{
            const channel = await this.prismaService.chat.findUnique({
                where: {
                    name: name
                }
            })
            const idChat = channel.id
            const partecipant = await this.prismaService.partecipant.findUnique({
                where: {
                    idIntra_idChat: {idIntra, idChat}
                }
            })

            if (partecipant.bannedUntil ){
                if (partecipant.bannedUntil > new Date())
                    return true
            }
            return false

        }
        catch(err){
            throw new BadRequestException(err)
        }
    
    }

    async isMuted(name: string, idIntra: string){

        try{
            const channel = await this.prismaService.chat.findUnique({
                where: {
                    name: name
                }
            })
            const idChat = channel.id
            const partecipant = await this.prismaService.partecipant.findUnique({
                where: {
                    idIntra_idChat: {idIntra, idChat}
                }
            })

            if (partecipant.mutedUntil > new Date())
                return true
            return false
        }
        catch(err){   
            throw new BadRequestException(err)
        }
    
    }
    
    async muteUser(body: any, userId: number){
        try{
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
                if (await this.isMuted(body.name, user.idIntra))
                throw new BadRequestException('User already muted');
                if (!await this.isAlreadyIn(body.name, user.idIntra))
                throw new BadRequestException('User not in channel');
                const channel = await this.prismaService.chat.findUniqueOrThrow({
                    where: {
                        name: body.name
                    }
                })
            if ((await this.isAdmin(body.name, userId) || await this.isChanOwner(body.name, reqUser.idIntra)) && !await this.isChanOwner(body.name, user.idIntra)){

                if (body.time){
                    const partecipant = await this.prismaService.partecipant.update({
                        where: {
                            idIntra_idChat: {idIntra: body.idIntra, idChat: channel.id}
                        },
                        data: {
                            mutedAt: new Date(),
                            mutedUntil: new Date(new Date().getTime() + body.time*60000)
                        }
                    })
                }
                else if (!body.time || body.time <= new Date())
                {
                    const partecipant = await this.prismaService.partecipant.update({
                        where: {
                            idIntra_idChat: {idIntra: body.idIntra, idChat: channel.id}
                        },
                        data: {
                            mutedAt: new Date(),
                            mutedUntil: new Date(new Date().getTime() + 60 * 60000 * 24 * 365 * 100) // 100 years
                        }
                    })
                }
            }
            else{
                throw new BadRequestException('You are not an admin')
            }
        }
        catch(err){
            throw new BadRequestException(err)
        }
    }

    async isAlreadyIn(name: string, idIntra: string){
        try{
            const channel = await this.prismaService.chat.findUnique({
                where: {
                    name: name
                }
            })
            const idChat = channel.id
            const partecipant = await this.prismaService.partecipant.findUnique({
                where: {
                    idIntra_idChat: {idIntra, idChat}
                }
            })
            if (partecipant){
                return true
            }
            return false
        }
        catch(err){
            throw new BadRequestException(err)
        }
    }

    async isAdmin(name: string, userId: number){
        try{
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    name: name
                }
            })

            const partecipant = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: {idIntra: user.idIntra, idChat: channel.id}
                }
            })

            if (partecipant.admin)
            {
                return true
            }
            return false
        }
        catch(err){ 
            throw new BadRequestException(err)
        }
    }

    async changePassword(body: any, userId: number){
        try
        {
            
            if (await this.isAdmin(body.name, userId)){
                const chan = await this.prismaService.chat.update({
                    where: {
                        name: body.name
                    },
                    data: {
                        password: await argon.hash(body.password)
                    }
                })
            }
            else{
                throw new BadRequestException('You are not an admin')
            }
        }
        catch(err){
            throw new BadRequestException(err)
        }
    }

    async changeVisibility(body: any, userId: number){
        try
        {
            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            if (!(body.type === 'public') && !(body.type === 'private') && !(body.type === 'protected'))
                throw new BadRequestException('Type must be public, private or protected')
            if (!await this.isChanOwner(body.name, reqUser.idIntra))
                throw new BadRequestException('You are not an owner')
            if ((body.type === 'public') || (body.type === 'private')){
                const chan = await this.prismaService.chat.update({
                    where: {
                        name: body.name
                    },
                    data: {
                        type: body.type,
                        password: null
                    }
                })
            }
            else if (body.type === 'protected'){
                if (!body.password)
                    throw new BadRequestException('Password is required')
                const chan = await this.prismaService.chat.update({
                    where: {
                        name: body.name
                    },
                    data: {
                        type: body.type,
                        password: await argon.hash(body.password)
                    }
                })
            }
        }
        catch(err){
            throw new BadRequestException(err)
        }
    }

    async joinChannel(body: any, userId: number){
        
        try{
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            if (await this.isBanned(body.name, user.idIntra))
                throw new BadRequestException('User is Banned');
            if (await this.isAlreadyIn(body.name, user.idIntra))
                throw new BadRequestException('User is already in the channel');

            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    name: body.name
                }
            })

            if (channel.type === 'protected'){
                if (await argon.verify(channel.password, body.password)){
                    const partecipant = await this.prismaService.partecipant.create({
                        data: {
                            idChat: channel.id,
                            idIntra: user.idIntra,
                        }
                    })
                }
                else{
                    throw new BadRequestException('Wrong password')
                }
            }
            if (channel.type === 'public'){
                const partecipant = await this.prismaService.partecipant.create({
                    data: {
                        idChat: channel.id,
                        idIntra: user.idIntra,
                    }
                })
            }
            else if (channel.type === 'private'){
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
        catch(err){
            throw new BadRequestException(err)
        }
    }

    async unMuteUser(body: any, userId: number){
        try{
            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })

            if (!await this.isAdmin(body.name, userId) && !await this.isChanOwner(body.name, reqUser.idIntra)){
                throw new BadRequestException('You are not an admin or owner')
            }
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't unmute yorself")
            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    name: body.name
                }
            })
            if (!await this.isMuted(body.name, user.idIntra))
                throw   new BadRequestException('User is not muted');
            const partecipant = await this.prismaService.partecipant.update({
                where: {
                    idIntra_idChat: {idIntra: body.idIntra, idChat: channel.id}
                },
                data: {
                    mutedAt: null,
                    mutedUntil: null
                }
            })
            
        }
        catch(err){
            throw new BadRequestException(err);
        }
    }

    async unBanUser(body: any, userId: number){
        try{
            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            if (!await this.isAdmin(body.name, userId) && !(await this.isChanOwner(body.name, reqUser.idIntra))){
                throw new BadRequestException('Not an admin or owner')
            }
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't unban yorself")
            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    name: body.name
                }
            })
            if (!await this.isBanned(body.name, user.idIntra))
                throw   new BadRequestException('User is not muted');
            const partecipant = await this.prismaService.partecipant.update({
                where: {
                    idIntra_idChat: {idIntra: body.idIntra, idChat: channel.id}
                },
                data: {
                    bannedAt: null,
                    bannedUntil: null,
                }
            })
            
        }
        catch(err){
            throw new BadRequestException(err);
        }
    }

    async leaveChannel(body: any, userId: number){
        
        try{
            //console.log(userId)
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            
            
            if (!await this.isAlreadyIn(body.name, user.idIntra))
                throw new BadRequestException('User is not in the channel');
            else if (await this.isBanned(body.name, user.idIntra))
                throw new BadRequestException('User is Banned');
                
            const channel = await this.prismaService.chat.findUniqueOrThrow({
                where: {
                    name: body.name
                }
            })
                
                
            const partecipant = await this.prismaService.partecipant.delete({
                where: {
                    idIntra_idChat: {idIntra: user.idIntra, idChat: channel.id}
                }
            })

            

            if (await this.isChanOwner(body.name, user.idIntra))
            {
                await this.destroyChannel(body.name, userId);
            }
            
        }
        catch(err){
            
            throw new BadRequestException(err)
        }
    }

    async banUser(body: any, userId: number)
    {
        try{
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })
            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't ban yorself")
            if (!await this.isAlreadyIn(body.name, user.idIntra))
                throw new BadRequestException('User is not in the channel');
            if (await this.isBanned(body.name, user.idIntra))
                throw new BadRequestException('User is already Banned');
                const channel = await this.prismaService.chat.findUnique({
                    where: {
                        name: body.name
                    }
                })
            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            if ((!await this.isAdmin(body.name, userId) && !await this.isChanOwner(body.name, reqUser.idIntra)) || await this.isChanOwner(body.name, user.idIntra))
                throw new BadRequestException('Not enough rights');
            if (body.time){
                const partecipant = await this.prismaService.partecipant.update({
                    where: {
                        idIntra_idChat: {idIntra: body.idIntra, idChat: channel.id}
                    },
                    data: {
                        bannedAt: new Date(),
                        bannedUntil: new Date(new Date().getTime() + body.time*60000),
                    }
                })
            }
            else if (!body.time || body.time <= new Date())
            {
                const partecipant = await this.prismaService.partecipant.update({
                    where: {
                        idIntra_idChat: {idIntra: body.idIntra, idChat: channel.id}
                    },
                    data: {
                        bannedAt: new Date(),
                        bannedUntil: new Date(new Date().getTime() + 60 * 60000 * 24 * 365 * 100) // 100 years
                    }
                })
            }
        }
        catch(err){
            throw new BadRequestException(err)
        }
    }

    async addUser(body: any, userId: number)
    {
        try{    
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
                throw new BadRequestException("Can't add yorself")
            if (!await this.isAdmin(body.name, userId) && ! await this.isChanOwner(body.name, reqUser.idIntra))
                throw new BadRequestException('not enough rights');
            
            const channel = await this.prismaService.chat.findFirstOrThrow({
                where: {
                    name: body.name
                }
            })

            const partecipant = await this.prismaService.partecipant.create({
                data: {
                    idChat: channel.id,
                    idIntra: user.idIntra,
                }
            })
            
        }
        catch(err)
        {
            throw new BadRequestException(err)
        }
    }

    async removeUser(body: any, userId: number)
    {
        try{    
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    idIntra: body.idIntra
                }
            })

            const channel = await this.prismaService.chat.findFirstOrThrow({
                where: {
                    name: body.name
                }
            })

            const reqUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })
            
            if (user.idIntra !== body.idIntra)
                throw new BadRequestException("Can't remove yorself")
            if ((!await this.isAdmin(body.name, userId) && !await this.isChanOwner(body.name, reqUser.idIntra)))
                throw new BadRequestException('Not enough rights');
            if (await this.isChanOwner(body.name, user.idIntra))
                throw new BadRequestException("Can't remove owner");
            if (await this.isBanned(body.name, user.idIntra))
                throw new BadRequestException('User is Banned');

            const partecipant = await this.prismaService.partecipant.delete({
                where: {
                    idIntra_idChat: {idIntra: user.idIntra, idChat: channel.id}
                }
            })

            await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: {idIntra: user.idIntra, idChat: channel.id}
                }
            })

            await this.prismaService.partecipant.delete({
                where: {
                    idIntra_idChat: {idIntra: user.idIntra, idChat: channel.id}
                }
            })
        }
        catch(err)
        {
            throw new BadRequestException(err)
        }
    }

    async addAdmin(body: any, userId: number)
    {
        try{
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
                throw new BadRequestException("Can't add yorself")
            if (!await this.isAdmin(body.name, userId) && !await this.isChanOwner(body.name, reqUser.idIntra))
                throw new BadRequestException('User is not an admin or owner');
            
            const channel = await this.prismaService.chat.findFirstOrThrow({
                where: {
                    name: body.name
                }
            })

            const partecipant = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: {idIntra: user.idIntra, idChat: channel.id}
                },
            })
            if (!partecipant.admin)
            {
                await this.prismaService.partecipant.update({
                    where: {
                        idIntra_idChat: {idIntra: user.idIntra, idChat: channel.id}
                    },
                    data:{
                        admin: true,
                    }
                })
            }
            
        }
        catch(err)
        {
            throw new BadRequestException(err);
        }
    }

    async removeAdmin(body: any, userId: number)
    {
        try{
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userId
                }
            })


            if (user.idIntra === body.idIntra)
                throw new BadRequestException("Can't remove yorself")
            if (!await this.isAdmin(body.name, userId) && !await this.isChanOwner(body.name, user.idIntra))
                throw new BadRequestException('Not enough rights');
            
            const channel = await this.prismaService.chat.findFirstOrThrow({
                where: {
                    name: body.name
                }
            })

            const partecipant = await this.prismaService.partecipant.findUniqueOrThrow({
                where: {
                    idIntra_idChat: {idIntra: user.idIntra, idChat: channel.id}
                },
            })
            if (partecipant.admin)
            {
                await this.prismaService.partecipant.update({
                    where: {
                        idIntra_idChat: {idIntra: body.idIntra, idChat: channel.id}
                    },
                    data:{
                        admin: false,
                    }
                })
            }
        }
        catch(err)
        {
            throw new BadRequestException(err);
        }
    }

}