import {Controller, Get, UseGuards, Req, Bind, Param, Post, Body,Res, UseInterceptors, UploadedFile} from "@nestjs/common";
import { FileInterceptor} from "@nestjs/platform-express"
import { AtGuard } from "src/auth/guards";
import {JwtService} from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";
import { bindCallback } from "rxjs";
import { TwoFactorAuthenticationService} from './../auth/TwoFA/TwoFA.service'
import { MessageBody } from "@nestjs/websockets";
import { setUsernameDTO } from './dto/user.dto';

@Controller('user')
export class UserController{
	constructor(private prisma: PrismaService,
		private jwt: JwtService,
		private userservice: UserService,
		private twofa: TwoFactorAuthenticationService) {}

	@UseGuards(AtGuard)
	@Get('me')
	async getMe(@Req() req)
	{
		const user = req.user
		return await this.userservice.getProfile(user['sub'])
	}

	@UseGuards(AtGuard)
    @Post('isBlocked')
    async isBlocked(@Body() body, @Req() req){
        const user = req.user
        if (body['idIntra'] !== undefined)
        	return await this.userservice.isBlocked(body.idIntra, user['idIntra'])
    }

	@UseGuards(AtGuard)
	@Get('all')
	async getAllUsers()
	{
		return await this.userservice.getAllUsers()
	}

	//deve rimuovere dagli amici se ci sei
	@UseGuards(AtGuard)
	@Post('block/:idIntra')
	@Bind(Param('idIntra'))
	async blockUser(idIntra, @Req() req)
	{
	   const user = req.user
	   return await this.userservice.block(idIntra, user['sub'])
	}

	@UseGuards(AtGuard)
	@Post('unblock/:idIntra')
	@Bind(Param('idIntra'))
	async unblockUser(idIntra, @Req() req)
	{
	   const user = req.user
	   return await this.userservice.unblock(idIntra, user['sub'])
	}

	// @UseGuards(AtGuard)
	// @Post('turn-on-2fa')
	// async turnOn2fa(@Req() req)
	// {
	// 	const user = req.user
	// 	console.log(user)
	// 	return await this.twofa.turnOnTwoFa(user['sub'])
	// }

	// @UseGuards(AtGuard)
	// @Post('turn-off-2fa')
	// async turnOff2fa(@Req() req)
	// {
	// 	const user = req.user
	// 	return await this.userservice.turnOffTwoFa(user['sub'])
	// }

	@UseGuards(AtGuard)
	@Post('update/pp')
	async changePP(@Body() body, @Req() req)
	{
		const user = req.user
		// console.log(body)
		return await this.userservice.changepp(body, user['sub'])
	}

	@UseGuards(AtGuard)
	@Post('delete/pp')
	async deletePP(@Body() body, @Req() req)
	{
		const user = req.user
		return await this.userservice.deletepp(body, user['sub'])
	}

	@UseGuards(AtGuard)
	@Post('update/username')
	async changeusername(@Req() req, @Body() body: setUsernameDTO)
	{
		const user = req.user
		return await this.userservice.changeUserName(body, user['sub'])
	}

	@UseGuards(AtGuard)
	@Get('getBlocked')
	async getBlocked(@Req() req)
	{
	   const user = req.user
	   return await this.userservice.getBlocked(user['idIntra'])
	}

	@UseGuards(AtGuard)
	@Get(':idIntra')
	@Bind(Param('idIntra'))
	async getUserProfile(idIntra, @Req() req)
	{
	   const user = req.user
	   return await this.userservice.getUserProfile(idIntra, user['sub'])
	}

	@Get('/new/all')
	async addUsers(@Res() res){
		try {
			const users = ["ltorrean", "mpaci" , "mcrisari", "taureli",
			"liafigli", "vubeffa", "gscala", "bvalaria", "brygonza", "mobrycki", "vbeffa", "mpatrini", "effefrau"]
			if (await this.prisma.user.findUnique({ where: { id: 1 } }))
			{
				for (let i = 0; i < users.length; i++)
				{
					const user = await this.prisma.user.findUnique({where: {idIntra: users[i]}})
					if (!user)
					{
						let newUser = await this.userservice.addNewUser(users[i]);
						if (newUser)
							console.log("User created");
						else
							console.log("Error while creating user");
					}
					console.log ("User already exist");
				}
				return res.redirect('/Leaderboard')
			}
			else
			{
				return res.redirect('/');
			}
		}
		catch
		{
			return res.redirect('/api/user/new/all');
		}
	}

	@Get('/new/:username')
	async addUser(@Req() req, @Param('username') username: string){
		if (username)
		{
			const user = await this.prisma.user.findUnique({where: {idIntra: username}})
			if (!user)
			{
				let newUser = await this.userservice.addNewUser(username);
				if (newUser)
					return {statusCode: 200, message: "User created"};
				else
					return {statusCode: 500, message: "Error while creating user"};
			}
		}
		return {statusCode: 400, message: "User already exist"};
	}



}
