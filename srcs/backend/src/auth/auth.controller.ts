import { Controller, Get, Res, Req, Post, UseGuards, Query, Body, Param, Bind} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {PrismaService} from "../prisma/prisma.service"
import { Response, Request } from 'express'
import { AtGuard } from "./guards";
import { TwoFactorAuthenticationService } from "./TwoFA/TwoFA.service";
import { UserService } from "src/user/user.service";

let tokens;

@Controller('auth')
export class AuthController{
	constructor(private readonly prisma: PrismaService,
		 private authservice: AuthService,
		  private twoFaService: TwoFactorAuthenticationService,
		  private userService: UserService,
		  ) {}

		//@Public()
		@Get()
		login(@Res() res) {
			return res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=${process.env.CLIENT_SECRET}&redirect_uri=http%3A%2F%2F${process.env.HOST}%2Fapi%2Fauth%2F42%2Fcallback&response_type=code`)
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
        	res.redirect(`http://${process.env.HOST}/`);
		}

		// @Get('2fa/:id')
		// @Bind(Param('id'))
		// async findone(id) {
		// 	let x = await this.twoFaService.complete2fa(id)
		// 		return {QRcode : x}
		// }


		@UseGuards(AtGuard)
		@Post('2fa/turn-on')
		async verify2fa2(@Body() body, @Req() req){
			return this.twoFaService.verify2fa2(body, req['user']['sub'])
		}

		@Post('2fa/verify')
		async verify2fa(@Body() body, @Res() res, @Req() req){
			console.log
			return await this.twoFaService.verify2fa(body, res, req.cookies['id'])
		}


		@UseGuards(AtGuard)
		@Post('2fa/generate')
		async generate2fa(@Body() body, @Req() req){
			let x = await this.twoFaService.complete2fa(req['user']['sub'])
			return {QRcode : x}
		}

		@UseGuards(AtGuard)
		@Post('2fa/turn-off')
		async turnOffTfa(@Body() body, @Req() req){
			return this.userService.turnOffTwoFa(req['user']['sub'])
		}







		// @Post('turn-on-2fa')
		// async turnOn2fa(@Body() body) {
		// 	await this.twoFaService.turnOnTwoFa(body.id);
		// }

}

