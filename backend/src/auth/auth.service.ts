import { ForbiddenException, Injectable } from "@nestjs/common";
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
    //campus: string,
}

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async getAuthCode(@Query('code') query: string, @Res() res: Response) {
		fetch('https://api.intra.42.fr/oauth/token?' + new URLSearchParams({
			grant_type: 'authorization_code',
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			code: query,
			redirect_uri: `http://${process.env.HOST}:3333/auth/42/callback`,
		}), {
		method: 'POST',
		headers:{
			'Content-Type': 'application/json'
		}, 
	})
	.then(response =>  response.json())
	.then(data =>{
		this.getToken(data.access_token, res);
	})
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
			.then(datiJson => {
				let ret: UserData = ({
					idIntra: datiJson.login,
					userName: `${datiJson.login}_${String(Date.now())}`,
					firstName: datiJson.first_name,
					lastName: datiJson.last_name,
					img: datiJson.image_url,
					email: datiJson.email,
					
					//campus: datiJson.campus[0].name,

				});
				return ret;
			})
			.then( async ret => {
				let user;
				try{
					user = await this.prisma.user.findUnique({
						where:{
							idIntra: ret.idIntra,
						},
						rejectOnNotFound: true
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
					res.redirect(`/api/auth/2fa/${user.id}`)
				else
				{
					const tokens = await this.generateJwtTokens(user.id, user.email);
					res.cookie('at', tokens.access_token, { httpOnly: true })
					res.redirect(`http://${process.env.HOST}:3000/home`)
				}
			})
		}
		catch (e) {
			throw new HttpException("Something wrong " + e.message, HttpStatus.CONFLICT)
		}
	}

	hashData(data: string){
		return argon.hash(data)
	}

	async generateJwtTokens(userId: number, email: string) {
		const [at, rt] = await Promise.all([

			this.jwtService.signAsync({
				sub: userId,
				email
			}, {
				secret: process.env.AtSecret,
				expiresIn: 60
			}),

			this.jwtService.signAsync({
				sub: userId,
				email
			}, {
				secret: process.env.RtSecret,
				expiresIn: 60 * 15
			}),
		])

		return {
			access_token: at,
			refresh_token: rt
		}
	}

}