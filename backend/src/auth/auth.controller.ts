import { Controller, Get, Res, Req, Post, UseGuards, Query, Body, Param, Bind} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {PrismaService} from "../prisma/prisma.service"
import { Response, Request } from 'express'
import { AtGuard } from "./guards";
import { TwoFactorAuthenticationService } from "./TwoFA/TwoFA.service";

let tokens;

@Controller('auth')
export class AuthController{
	constructor(private readonly prisma: PrismaService,
		 private authservice: AuthService,
		  private twoFaService: TwoFactorAuthenticationService) {}

		//@Public()
		@Get()
		login(@Res() res) {
			return res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=b8678efb904092c69d53edc729861043485a2654aa77b11de732ce0f0f65701a&redirect_uri=http%3A%2F%2F10.11.8.2%3A3333%2Fauth%2F42%2Fcallback&response_type=code`)
		}

		//@Public()
		@Get('42/callback')
		getAuthCode(@Query('code') query: string, @Res() res) {
			this.authservice.getAuthCode(query, res)
		}


		@UseGuards(AtGuard)
		@Get('logout')
		logout(@Res() res: Response) {
			res.clearCookie('at');
        	res.redirect(`http://${process.env.HOST}:3000/`);
		}

		@Get('2fa/:id')
		@Bind(Param('id'))
		async findone(id) {
			let x = await this.twoFaService.complete2fa(id)
				return {QRcode : x}
		}
		
			

		@Post('verify2fa')
		async verify2fa(@Body() body, @Res() res:Response){
			this.twoFaService.verify2fa(body, res)
				.then((e) => {e? res.redirect(`http://${process.env.HOST}:3000/`) : res.redirect(`http://${process.env.HOST}:3000/`); return e})
		}

		// @Post('turn-on-2fa')
		// async turnOn2fa(@Body() body) {
		// 	await this.twoFaService.turnOnTwoFa(body.id);
		// }
	
}

