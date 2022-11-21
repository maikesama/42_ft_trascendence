import { ForbiddenException, Injectable, BadRequestException } from "@nestjs/common";
import { Res, Query, HttpException, HttpStatus} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service"
import fetch from 'node-fetch';
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

interface UserData {
    idIntra: string,
    userName: string,
    firstName: string,
    lastName: string,
    img: string,
	email: string
	accessToken: string
    //campus: string,
}

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async getAuthCode(@Query('code') query: string, @Res() res: Response) {
		try{

			const response = await fetch('https://api.intra.42.fr/oauth/token?' + new URLSearchParams({
				grant_type: 'authorization_code',
				client_id: process.env.CLIENT_ID,
				client_secret: process.env.CLIENT_SECRET,
				code: query,
				redirect_uri: `http://${process.env.HOST}/api/auth/42/callback`,
			}), {
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			})
			if (response.status !== 200)
				return res.redirect(`http://${process.env.HOST}/`)
			const data = await response.json()
			if (data)
				await this.getToken(data.access_token, res);
			}
		catch (e) {
			return res.redirect(`http://${process.env.HOST}/`)
		}
}

	async checkUsername(username: string){
		const user = await this.prisma.user.findUnique({
			where: {
				userName: username
			}
		})
		if(user){
			username = username + Math.floor(Math.random() * 10004)
			return this.checkUsername(username)
		}
		return username
	}

	async changeFirstLogin(id: number){
		try{
			await this.prisma.user.update({
				where: {
					id: id
				},
				data: {
					firstLogin: 1
				}
			})
		}
		catch (e) {
			console.log(e)
		}

	}

	private async getToken(token: string, @Res() res) {
		let first = false;
		try{
			return fetch('https://api.intra.42.fr/v2/me', {
				method: 'GET',
				headers:{
					'Authorization': `Bearer ${token}`
				}
			})
			.then(response => response.json())
			.then(async datiJson => {
				let ret: UserData = ({
					idIntra: datiJson.login,
					userName: await this.checkUsername(datiJson.login),
					firstName: datiJson.first_name,
					lastName: datiJson.last_name,
					img: datiJson.image_url,
					email: datiJson.email,
					accessToken : token

					//campus: datiJson.campus[0].name,

				});
				return ret;
			})
			.then( async ret => {
				let user;
				try{
					user = await this.prisma.user.findUniqueOrThrow({
						where:{
							idIntra: ret.idIntra,
						},

					})

				}
				catch(e)
				{
					first = true;
					user = await this.prisma.user.create({
						data: ret
					})
				}
				if (user.twoFa === true)
				{
					res.cookie('id', user.id, {httpOnly: true})
					res.redirect('/twofa')
				}
				else
				{
					const tokens = await this.generateJwtTokens(user);
					res.cookie('at', tokens.access_token, { httpOnly: true })
					if (!user.firstLogin)
					{
						res.redirect(`http://${process.env.HOST}/middleware`)
						await this.changeFirstLogin(user.id);
					}
					else
					{
						res.redirect(`http://${process.env.HOST}/`)
					}

				}
			})
		}
		catch (e) {
			res.redirect(`http://${process.env.HOST}/`)
			throw new HttpException("Something wrong " + e.message, HttpStatus.CONFLICT)
		}
	}

	hashData(data: string){
		return argon.hash(data)
	}

	// async generateJwtTokens(userId: number, email: string) {
	// 	const [at, rt] = await Promise.all([

	// 		this.jwtService.signAsync({
	// 			sub: userId,
	// 			email
	// 		}, {
	// 			// secret: process.env.AtSecret,
	// 			// expiresIn: 60 * 60 * 24 * 7
	// 		}),

	// 		this.jwtService.signAsync({
	// 			sub: userId,
	// 			email
	// 		}, {
	// 			secret: process.env.RtSecret,
	// 			expiresIn: 60 * 15
	// 		}),
	// 	])

	// 	return {
	// 		access_token: at,
	// 		refresh_token: rt
	// 	}
	// }
	async generateJwtTokens(user: any) {
		// console.log(user);
		if (user && user.id && user.idIntra && user.email) {
			const payload = { sub: user.id, idIntra: user.idIntra};
			// const payload = { sub: 6, idIntra: "vubeffa"};
			return {
				access_token: this.jwtService.sign(payload),
			};
		}
		return null;
	}

}
