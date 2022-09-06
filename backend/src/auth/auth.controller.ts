import { Controller, Get, Res, Post, UseGuards, Query, Req, HttpException, HttpStatus} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {PrismaService} from "../prisma/prisma.service"
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from 'express'
import { AtGuard, RtGuard } from "./guards";
import { Public } from './decorators/public.decorator'

let tokens;

@Controller('auth')
export class AuthController{
	constructor(private readonly prisma: PrismaService, private authservice: AuthService) {}

		//@Public()
		@Get()
		login(@Res() res) {
			return res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=b8678efb904092c69d53edc729861043485a2654aa77b11de732ce0f0f65701a&redirect_uri=http%3A%2F%2F${process.env.HOST}%3A80%2Fapi%2Fauth%2F42%2Fcallback&response_type=code`)
		}

		//@Public()
		@Get('42/callback')
		getAuthCode(@Query('code') query: string, @Res() res) {
			this.authservice.getAuthCode(query, res)
		}
	

		@Get('status')
		status() {
			return {msg: 'ok'}
		}

		@Get('getId')
		sendId(@Res() res)
		{
			//console.log(tokens);

		}

		@UseGuards(AtGuard)
		@Post('logout')
		logout(@Req() req: Request) {
			const user = req.user;
			return this.authservice.logout(user['sub'])
		}

		//@Public()
		@UseGuards(RtGuard)
		@Post('refresh')
		refresh(@Req() req: Request)
		{
			const user = req.user;
			return this.authservice.refreshTok(user['sub'], user['refreshToken'])
		}
	
}

