import { ForbiddenException, Injectable } from "@nestjs/common";
import { Res, Query, HttpException, HttpStatus} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service"
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async getProfile(Id: number)
	{
		const user = await this.prisma.user.findUniqueOrThrow({
			where:{
				id: Id
			}
		})

		delete user.otpSecret
		delete user.otpUrl
		delete user.twoFa

		return user
	}

	async getUserProfile(idintra: string, requestedBy: number)
	{
		try{
			const user = await this.prisma.user.findUniqueOrThrow({
				where:{
					idIntra: idintra
				},
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

	async checkIfBlocked(idintra: string, requestIdIntra: string)
	{
		const blocked = await this.prisma.blocklist
			.findMany({ where: { 
				blockId: idintra,
				blockedId: idintra } })

			let bool = blocked.find(block => {
				return block.blockId === requestIdIntra})
			
			if (bool)	return false;

			bool = blocked.find(block => {
				return block.blockedId === requestIdIntra})

			if (bool)	return false;

			return true

	}

	async getAllUsers()
	{
		let allUsers = await this.prisma.user.findMany({})

		allUsers = allUsers.map((user) => this.deleteSecrets(user))

		return allUsers
	}

	deleteSecrets(user : any) {
        delete user.twoFa;
        delete user.otpSecret;
        delete user.otpUrl;
        return user;
    }

	async block(idintra: string, requestId: number)
	{
		const me = await this.prisma.user.findUniqueOrThrow({where:{id: requestId}})

		await this.prisma.blocklist.create(
			{
				data:{
					blockId: idintra,
					blockedId: me.idIntra
				}
			}
		)
	}

	async unblock(idintra: string, requestId: number)
	{
		const me = await this.prisma.user.findUniqueOrThrow({where:{id: requestId}})

		await this.prisma.blocklist.deleteMany(
			{
				where:{
					blockId: idintra,
					blockedId: me.idIntra
				}
			}
		)
	}

	async turnOffTwoFa(Id: number)
	{
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

	async changepp(body, id: number)
	{
		await this.prisma.user.update({
			where:{
				id: id
			},
			data:{
				img: body.img
			}
		})
	}

	async changeUserName(body, id: number)
	{
		await this.prisma.user.update({
			where:{
				id: id
			},
			data:{
				userName: body.userName
			}
		})
	}

	async getChats(id: number)
	{
		const user = await this.prisma.user.findUnique({
			where:{
				id: id
			}
		})
		const ret = await this.prisma.participant.findMany({
			where:{
				idIntra: user.idIntra
			},
			include: {
				chat: true
			}
		})
		
		let rret = await Promise.all(ret.map(async (part: any)=> {
			let partecipant = await this.prisma.participant.findMany({
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
		return rret
	}
	

	async showChat(idChat : number) {
		    const chat : any = await this.prisma.chat.findUnique({
			    where: {
				    id: idChat
			    },
			    include: {
				    participant: true
			    }

		    })
		    chat.participant = await Promise.all(chat.participant.map(async (participant: any) => {
		    	let user = await this.prisma.user.findUnique({
				    where : {
				    	idIntra : participant.idIntra,
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
}