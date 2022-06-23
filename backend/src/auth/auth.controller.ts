import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateGuards, FortyTwoAuthGuards } from "./guards";



@Controller('auth')
export class AuthController{
	constructor(/*private authservice: AuthService*/) {}

		@Get('login')
		@UseGuards(FortyTwoAuthGuards)
		login(@Req() req) {
			console.log(req.user);
		}

		@Get('42/callback')
		@UseGuards(FortyTwoAuthGuards)
		@UseGuards(AuthenticateGuards)
		redirect() {
			return ;
		}


		@Get('logout')
		logout() {}
	
}