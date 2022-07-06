import { Controller, Get, Res, UseGuards, Query, HttpException, HttpStatus} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {PrismaService} from "../prisma/prisma.service"
import fetch from 'node-fetch';
import { AuthenticateGuards } from "./guards";

interface UserData {
    idIntra: string,
    userName: string,
    firstName: string,
    lastName: string,
    img: string,
	email: string
    //campus: string,
}

@Controller('auth')
export class AuthController{
	constructor(private readonly prisma: PrismaService, private authservice: AuthService) {}

		@Get()
		login(@Res() res) {
			return res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=c226c936db32c32c2c9e438d2b4f8389e53598d521963643b76c1be5385b6b2f&redirect_uri=http%3A%2F%2F${process.env.HOST}%3A3333%2Fauth%2F42%2Fcallback&response_type=code`)
		}

		@Get('42/callback')
		getAuthCode(@Query('code') query: string, @Res() res) {
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
		.then(response => 
			{
				console.log(response)
				return response.json()}
				)
		.then(data =>{ 
			console.log(data);
			this.getToken(data.access_token, res);
		})
		.then(res.redirect(`http://${process.env.HOST}:3000/home`))
	}


		private getToken(token: string, @Res() res): any {
			let first = false;
			try{
				console.log(`Bearer ${token}`);
				return fetch('https://api.intra.42.fr/v2/me', {
					method: 'GET',
					headers:{
						'Authorization': `Bearer ${token}`
					}
				})
				.then(response => 
					{
						console.log(response);
						return response.json()
					})
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
					console.log(ret)
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
				})
			}
			catch (e) {
				throw new HttpException("Something wrong " + e.message, HttpStatus.CONFLICT)
			}
		}
	

		@Get('status')
		@UseGuards(AuthenticateGuards)
		status() {
			return {msg: 'ok'}
		}

		@Get('logout')
		logout() {}
	
}