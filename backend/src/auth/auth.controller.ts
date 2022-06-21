import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
	constructor(private authservice: AuthService) {}

		@Post('login')
		login(/*@Body dto : AuthDto*/) {
			return this.authservice.login();
		}
	
}