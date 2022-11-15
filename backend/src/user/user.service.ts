import { ForbiddenException, Injectable } from "@nestjs/common";
import { Res, Query, HttpException, HttpStatus} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service"
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async getBlocked(userId: number){
		try{
			const user = await this.prisma.user.findUnique({
				where: { id: userId },
				include: {
					blocked: {
						include: {
							blocked: true

						}
					}
				}
			})
			const blockedInfo = user.blocked.map((b) => {
				return {
					idIntra: b.blocked.idIntra,
					img: b.blocked.img,
				}})

			return blockedInfo
		}
		catch(e){
			throw new HttpException(e, HttpStatus.BAD_REQUEST)
		}
	}

	async getProfile(Id: number)
	{
		try {
			const user = await this.prisma.user.findUniqueOrThrow({
				where:{
					id: Id
				}
			})

			delete user.otpSecret
			delete user.otpUrl

			return user

		}
		catch (e) {
			console.log(e)
			throw new HttpException('User not found', HttpStatus.NOT_FOUND)
		}
	}

	async verifyUserByIdIntra(idIntra: string){
		try{
			const user = await this.prisma.user.findUniqueOrThrow({
				where: {
					idIntra: idIntra
				},
				select: {
					id : true,
					idIntra: true,
					userName : true,
					img : true,
				}
			})
			return user
		}
		catch(e){
			throw new HttpException(e, HttpStatus.BAD_REQUEST)
		}
	}

	async getUserByIdIntra(idIntra: string){
		try{
			const user = await this.prisma.user.findUniqueOrThrow({
				where: {
					idIntra: idIntra
				},
			})
			return user
		}
		catch(e){
			throw new HttpException(e, HttpStatus.BAD_REQUEST)
		}
	}

	async changeUserStatus(idIntra: string, st: number){
		try{
			st === 0
			let data: Date = (st !== 0 ) ?
				new Date(new Date().getTime() +  (1000 * 60 * 60 * 24 * 7) * 1000):
				new Date();
			const user = await this.prisma.user.update({
				where: {
					idIntra: idIntra
				},
				data: {
					status: st,
					lastOnline: data
				}
			})
			return true
		}
		catch(e){
			throw new HttpException(e, HttpStatus.BAD_REQUEST)
		}
	}

	async getUserProfile(idintra: string, requestedBy: number)
	{
		try{
			const user = await this.prisma.user.findUniqueOrThrow({
				where:{
					idIntra: idintra
				},
				include: {
					friend: true,
					friendBy: true,
				}
			})

			delete user.otpSecret
			delete user.otpUrl
			delete user.twoFa

			const requestedByUser = await this.prisma.user.findUniqueOrThrow({
				where: {
					id: requestedBy
				}
			})

			const canSee = await this.checkIfBlocked(idintra, requestedByUser.idIntra);

			if (!canSee)	throw new HttpException("Blocked", HttpStatus.BAD_REQUEST);

			return user
		}
		catch(e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
		}
	}


	async isBlocked(userId: string, blockId: string) {
        try{
            const blocked = await this.prisma.blocklist.findMany({
                where: {
                    OR: [
                        {blockId: userId, blockedId: blockId},
                        {blockId: blockId, blockedId: userId}
                    ]
                }
            })
            if (blocked.length > 0)
                return true
            return false
        }
        catch(e){
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

	async checkIfBlocked(idintra: string, requestIdIntra: string)
	{
		try {
		const blocked = await this.prisma.blocklist.findMany({
			where: {
				blockId: idintra,
				blockedId: idintra } })

			let bool = blocked.find(block => {
				return block.blockId === requestIdIntra})

			if (bool)	return false;

			bool = blocked.find(block => {
				return block.blockedId === requestIdIntra})

			if (bool)
				return false;
			return true
		}
		catch (e) {
			throw new HttpException(e, HttpStatus.NOT_FOUND)
		}

	}

	async getAllUsers()
	{
		try{
			let allUsers = await this.prisma.user.findMany({
				select: {
					id: true,
					idIntra: true,
					userName: true,
					email: true,
					tel: true,
					img: true,
					firstName: true,
					lastName: true,
					createdAt: true,
					winRow: true,
					win: true,
					loss: true,
					rank: true,
					friend: true,
					friendBy: true,
					blocked: true,
					blockedby: true,
					invited: true,
					invitedBy: true,
					partecipant: true,
					messages: true,
				}
			})

			return allUsers
		}
		catch (e) {
			throw new HttpException(e, HttpStatus.NOT_FOUND)
		}
	}

	// deleteSecrets(user : any) {

	// 	let usr = user
    //     delete usr.twoFa;
    //     delete usr.otpSecret;
    //     delete usr.otpUrl;
    //     return user;
    // }

	async block(idintra: string, requestId: number)
	{
		try{
			const me = await this.prisma.user.findUniqueOrThrow(
				{
					where:{
						id: requestId
					}
				})
			if (me.idIntra === idintra)
				throw new HttpException("You can't block yourself", HttpStatus.BAD_REQUEST)
			await this.prisma.blocklist.create({
				data:{
					blockId: me.idIntra,
					blockedId: idintra
				}
			})
			const friended = await this.prisma.friend.findMany({
				where: {
					OR: [
						{
							friendId: me.idIntra,
							friendById: idintra

						},
						{
							friendId: idintra,
							friendById: me.idIntra
						},
					]
				}
			})
			if (friended.length > 0)
			{
				await this.prisma.friend.deleteMany({
					where: {
						OR: [
							{
								friendId: me.idIntra,
								friendById: idintra

							},
							{
								friendId: idintra,
								friendById: me.idIntra
							},
						]
					}
				})
			}
		}
		catch(e)
		{
			throw new HttpException(e, HttpStatus.NOT_FOUND)
		}
	}

	async unblock(idintra: string, requestId: number)
	{
		try{
			const me = await this.prisma.user.findUniqueOrThrow({where:{id: requestId}})

			if (me.idIntra === idintra)
				throw new HttpException("You can't unblock yourself", HttpStatus.BAD_REQUEST)
			await this.prisma.blocklist.delete({
				where:{
					blockId_blockedId: { blockId: me.idIntra, blockedId: idintra }
				}
			})
		}
		catch(e)
		{
			throw new HttpException(e, HttpStatus.NOT_FOUND)
		}
	}

	async turnOffTwoFa(Id: number)
	{
		try{
			await this.prisma.user.update({
				where: {
					id: Id
				},
				data:{
					twoFa: false,
					otpSecret: "",
					otpUrl: ""
				}
			})
		}
		catch(e)
		{
			throw new HttpException(e, HttpStatus.NOT_FOUND)
		}
	}

	async changepp(body, id: number)
	{
		try {
			// if(!body.dataURL)
			// 	return
			await this.prisma.user.update({
				where:{
					id: id
				},
				data:{
					img: body.dataURL
				}
			})
		}
		catch(e)
		{
			throw new HttpException(e, HttpStatus.NOT_FOUND)
		}
	}

	async deletepp(body, id: number)
	{
		try {
			await this.prisma.user.update({
				where:{
					id: id
				},
				data:{
					img: process.env.DEFAULTIMG
				}
			})
		}
		catch(e)
		{
			throw new HttpException(e, HttpStatus.NOT_FOUND)
		}
	}

	async changeUserName(body: any, id: number)
	{
		try {
			if(!body.userName)
				throw new HttpException("Username not set", HttpStatus.BAD_REQUEST)
			const check = await this.prisma.user.findUnique({
				where:{
					userName: body.userName
				}
			})
			if (check)
				throw new HttpException("Username already taken", HttpStatus.BAD_REQUEST)


			await this.prisma.user.update({
				where:{
					id: id
				},
				data:{
					userName: body.userName
				}
			})
		}
		catch(e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
		}

	}

	async getChats(id: number)
	{
		try {
			const user = await this.prisma.user.findUnique({
				where:{
					id: id
				}
			})

			//find chats where user is in
			const ret = await this.prisma.partecipant.findMany({
				where:{
					idIntra: user.idIntra
				},
				include: {
					chat: true
				}
			})


			// return all partecipants of each user's chats
			let chatsPartecipants = await Promise.all(ret.map(async (part: any)=> {
				let partecipant = await this.prisma.partecipant.findMany({
					where:{
						idChat: part.chat.id
					},
					include:{
						user: true,
					}
				})
				part.partecipant = partecipant
				return part;
			}))
			return chatsPartecipants
		}
		catch(e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
		}
	}


	async showChat(idChat : number) {
		try {
		    const chat : any = await this.prisma.chat.findUnique({
			    where: {
				    id: idChat
			    },
			    include: {
				    partecipant: true
			    }
		    })
		    chat.partecipant = await Promise.all(chat.partecipant.map(async (partecipant: any) => {
		    	let user = await this.prisma.user.findUnique({
				    where : {
				    	idIntra : partecipant.idIntra,
				    },
				    select : {
				    	id : true,
				    	idIntra : true,
					    img : true,
					    userName : true
				    }
			    })
			    return user;
		    }))
		    return chat;
		}
		catch(e) {
			throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
		}
	}

	async findNewUser(login :string)
	{
		const user = await this.prisma.user.findUnique({ where: { id: 1 } })
		return fetch('https://api.intra.42.fr/v2/users/' + login, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + user.accessToken,
			},
		})
			.then((response) => response.json());
	}

	async addNewUser(login :string){
		const newUser = await this.findNewUser(login);
		if (newUser && newUser['login']){
			return this.prisma.user.create({
				data: {
					firstName: newUser['first_name'],
					lastName: newUser['last_name'],
					idIntra: newUser['login'],
					img: newUser['image_url'],
					userName: newUser['login'],
					email: newUser['email'],
				}
			})
		}
		return null;
	}
}
