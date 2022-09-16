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

	async getUserProfile(idintra: string)
	{
		const user = await this.prisma.user.findUniqueOrThrow({
			where:{
				idIntra: idintra
			}
		})

		delete user.otpSecret
		delete user.otpUrl
		delete user.twoFa

		return user
	}

	async getAllUsers()
	{
		const allUsers = await this.prisma.user.findMany({
			select:{
				idIntra: true,
				userName: true,
				img: true,
				win: true,
				loss: true,
				rank: true,
			}
		})

		return allUsers
	}
}